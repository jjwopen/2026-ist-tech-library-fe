import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

import openapiTS, { astToString } from 'openapi-typescript';
import ts from 'typescript';

const BLOB = ts.factory.createTypeReferenceNode(ts.factory.createIdentifier('Blob')); // `Blob`
const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull()); // `null`

async function generateApiSchema() {
  const swaggerUser = Bun.env.SWAGGER_USER;
  const swaggerPassword = Bun.env.SWAGGER_PASSWORD;
  const swaggerUrl = Bun.env.SWAGGER_URL;

  // SWAGGER_URL이 없는 환경(Vercel 등)에서는 저장소에 커밋된 스키마를 그대로 사용
  if (!swaggerUrl) {
    console.warn('Skipping API schema generation: SWAGGER_URL is not set (using committed schema)');
    return;
  }

  const outputPath = join(process.cwd(), 'src/@types/api-schema.ts');

  try {
    console.log('Downloading Swagger JSON...');
    // 공개 문서면 인증 없이 요청, SWAGGER_USER/PASSWORD가 있으면 Basic 인증
    const response = await fetch(swaggerUrl, {
      headers:
        swaggerUser && swaggerPassword
          ? {
              Authorization: `Basic ${Buffer.from(`${swaggerUser}:${swaggerPassword}`).toString('base64')}`,
            }
          : undefined,
    });

    if (!response.ok) {
      throw new Error(`Failed to download Swagger JSON: ${response.status} ${response.statusText}`);
    }

    const swaggerJson = await response.json();

    console.log('Generating TypeScript types...');

    for (const path in swaggerJson.paths) {
      for (const method in swaggerJson.paths[path]) {
        for (const response in swaggerJson.paths[path][method].responses) {
          if (Number.parseInt(response) < 400) continue;
          const content = swaggerJson.paths[path][method].responses[response].content;
          if (content) continue;
          swaggerJson.paths[path][method].responses[response].content = {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorDto',
              },
            },
          };
        }
      }
    }

    swaggerJson.components.schemas['ErrorDto'] = {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        error: {
          type: 'string',
        },
        statusCode: {
          type: 'number',
        },
      },
      required: ['message', 'error', 'statusCode'],
    };

    const ast = await openapiTS(swaggerJson, {
      enum: true,
      dedupeEnums: true,
      makePathsEnum: true,
      arrayLength: true,
      transform(schemaObject) {
        if (schemaObject.format === 'binary') {
          return schemaObject.nullable ? ts.factory.createUnionTypeNode([BLOB, NULL]) : BLOB;
        }
        return undefined;
      },
    });

    const contents = astToString(ast);

    const outputDir = dirname(outputPath);
    mkdirSync(outputDir, { recursive: true });

    writeFileSync(outputPath, contents, 'utf-8');

    console.log('API schema generated successfully!');
  } catch (error) {
    console.error('Error generating API schema:', error);
    process.exit(1);
  }
}

generateApiSchema();
