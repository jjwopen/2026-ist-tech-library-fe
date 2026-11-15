export interface paths {
  '/api/health/live': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * API 프로세스 생존 확인
     * @description API 프로세스가 요청에 응답하는지 확인합니다. DB 및 외부 서비스 연결 상태는 확인하지 않습니다.
     */
    get: operations['AppController_live'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/books': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 도서 검색
     * @description printed_book 자료 중 지도에 연결된 소장 위치가 있는 책만 반환합니다. 다음 페이지는 nextOffset을 사용하세요. 기본값은 제목 검색이며, 동일 요청은 최대 60초 캐시합니다.
     */
    get: operations['CatalogController_search'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/books/{recordId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** 도서 상세 및 소장 위치 조회 */
    get: operations['CatalogController_detail'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/books/{recordId}/holdings/{holdingId}/items': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 소장본별 상태 및 반납 예정일 조회
     * @description 도서관의 공개 게스트 세션을 사용합니다. 반납일이 원본에 없으면 null입니다. 검색 결과의 holdings.id를 사용하세요.
     */
    get: operations['CatalogController_items'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/locations/estimate': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 청구기호로 서가·칸 추정
     * @description POSTECH 지도 범위를 사용합니다. 16만 권·153개 서가·70칸 가정이며 실측 위치가 아닙니다. 범위 중복은 후보로 반환합니다.
     */
    get: operations['LocationController_estimate'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/recommendations': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Python AI 도서 추천
     * @description 동봉한 253권 범위에서 추천합니다. 동일 ISBN·ISBN-10/13 별칭·중복 후보를 제외합니다. 최대 200초, 동일 AI 요청은 10분 캐시합니다. 소장 정보는 별도로 Primo에서 조회합니다.
     */
    post: operations['RecommendationsController_recommend'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    EstimatedCellDto: {
      /**
       * @description 청구기호 앞 절반=A, 뒤 절반=B. 안쪽 A=반시계/B=시계, 바깥쪽 A=시계/B=반시계 방향 쪽.
       * @enum {string}
       */
      side: EstimatedCellDtoSide;
      /**
       * @description 도면 기준 안쪽/바깥쪽 서가. 미등록 서가는 null.
       * @enum {string|null}
       */
      ring: EstimatedCellDtoRing;
      /**
       * @description 선택된 A/B면이 향한 쪽. 도면 중심 기준.
       * @enum {string|null}
       */
      sideDirection: EstimatedCellDtoSideDirection;
      row: number;
      column: number;
    };
    ShelfCandidateDto: {
      /** @example _3F-332 */
      shelfId: string;
      /** @example 332 */
      shelfNumber: string;
      /** @example 3 */
      floor: number;
      cell: components['schemas']['EstimatedCellDto'];
    };
    LocationGuideDto: {
      /** @enum {string} */
      status: LocationGuideDtoStatus;
      /** @example true */
      estimated: boolean;
      floor: number | null;
      shelfId: string | null;
      shelfNumber: string | null;
      mapElementIds: string[];
      cell: components['schemas']['EstimatedCellDto'] | null;
      /** @description 복수 후보가 있는 ambiguous 상태에서만 채웁니다. */
      candidates: components['schemas']['ShelfCandidateDto'][];
      label: string;
    };
    HoldingDto: {
      locationGuide: components['schemas']['LocationGuideDto'];
      /** @example 22110103000003286 */
      id: string | null;
      /** @example Book Collection(3F) */
      location: string | null;
      /** @example PL959.55. 한12 .채58 2007 */
      callNumber: string | null;
      /**
       * @description 소장 위치 단위 상태. unavailable이 반드시 대출 중을 뜻하지는 않습니다.
       * @enum {string}
       */
      availability: HoldingDtoAvailability;
    };
    BookDto: {
      /** @description 표지 이미지 URL. 표지가 없거나 조회에 실패하면 null. */
      imageUrl: string | null;
      /** @example alma991000688189703286 */
      id: string;
      /** @example 채식주의자 : 한강 연작소설 */
      title: string;
      /** @description 도서관이 제공하는 책 소개·요약. 제공되지 않으면 null이며 HTML을 제거한 텍스트입니다. */
      description: string | null;
      authors: string[];
      isbn: string[];
      publisher: string | null;
      publicationYear: string | null;
      holdings: components['schemas']['HoldingDto'][];
    };
    SearchResponseDto: {
      hasMore: boolean;
      /** @description 다음 검색 요청의 offset. 다음 페이지가 없으면 null. */
      nextOffset: number | null;
      books: components['schemas']['BookDto'][];
    };
    BookDetailDto: {
      /** @description 표지 이미지 URL. 표지가 없거나 조회에 실패하면 null. */
      imageUrl: string | null;
      /** @example alma991000688189703286 */
      id: string;
      /** @example 채식주의자 : 한강 연작소설 */
      title: string;
      /** @description 도서관이 제공하는 책 소개·요약. 제공되지 않으면 null이며 HTML을 제거한 텍스트입니다. */
      description: string | null;
      authors: string[];
      isbn: string[];
      publisher: string | null;
      publicationYear: string | null;
      holdings: components['schemas']['HoldingDto'][];
    };
    CopyDto: {
      locationGuide: components['schemas']['LocationGuideDto'];
      id: string | null;
      callNumber: string | null;
      copy: string | null;
      /** @enum {string} */
      status: CopyDtoStatus;
      /**
       * @description 확실하게 해석된 YYYY-MM-DD 날짜. 시간대·시각은 가정하지 않습니다.
       * @example 2026-12-01
       */
      dueDate: string | null;
    };
    ItemsResponseDto: {
      hasMore: boolean;
      nextStart: number | null;
      items: components['schemas']['CopyDto'][];
    };
    RecommendRequestDto: {
      /**
       * @description 선택한 도서의 ISBN-10 또는 ISBN-13
       * @example 9780134610993
       */
      isbn: string;
    };
    RecommendedBookDto: {
      title: string;
      isbn: string[];
      authors: string[];
      publishedDate: string | null;
      explanation: string;
      /** @enum {string} */
      catalogStatus: RecommendedBookDtoCatalogStatus;
      catalogBooks: components['schemas']['BookDto'][];
    };
    RecommendationsResponseDto: {
      recommendations: components['schemas']['RecommendedBookDto'][];
    };
    ErrorDto: {
      message: string;
      error: string;
      statusCode: number;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  AppController_live: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description API 프로세스가 정상적으로 응답합니다. */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /**
             * @example ok
             * @enum {string}
             */
            status: PathsApiHealthLiveGetResponses200ContentApplicationJsonStatus;
          };
        };
      };
    };
  };
  CatalogController_search: {
    parameters: {
      query: {
        limit?: number;
        offset?: number;
        material?: PathsApiBooksGetParametersQueryMaterial;
        field?: PathsApiBooksGetParametersQueryField;
        /** @description 1~200자. 쉼표·세미콜론·제어문자 제외. */
        q: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['SearchResponseDto'];
        };
      };
      /** @description 검색어 또는 페이지 값이 올바르지 않습니다. */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
      /** @description 도서관 연결 실패 또는 원본 응답 형식 변경 */
      502: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
      /** @description 요청 과다 또는 도서관 요청 제한. 잠시 후 재시도하세요. */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
      /** @description 도서관 응답 시간 초과 */
      504: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
    };
  };
  CatalogController_detail: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        recordId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['BookDetailDto'];
        };
      };
      /** @description 검색어 또는 페이지 값이 올바르지 않습니다. */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
      /** @description 해당 도서 없음 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
      /** @description 도서관 연결 실패 또는 원본 응답 형식 변경 */
      502: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
      /** @description 요청 과다 또는 도서관 요청 제한. 잠시 후 재시도하세요. */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
      /** @description 도서관 응답 시간 초과 */
      504: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
    };
  };
  CatalogController_items: {
    parameters: {
      query?: {
        limit?: number;
        start?: number;
      };
      header?: never;
      path: {
        recordId: string;
        holdingId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ItemsResponseDto'];
        };
      };
      /** @description 검색어 또는 페이지 값이 올바르지 않습니다. */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
      /** @description 해당 도서 또는 소장 위치 없음 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
      /** @description 도서관 연결 실패 또는 원본 응답 형식 변경 */
      502: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
      /** @description 요청 과다 또는 도서관 요청 제한. 잠시 후 재시도하세요. */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
      /** @description 도서관 응답 시간 초과 */
      504: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
    };
  };
  LocationController_estimate: {
    parameters: {
      query: {
        location?: unknown;
        locationCode?: unknown;
        callNumber: unknown;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['LocationGuideDto'];
        };
      };
      /** @description 청구기호 또는 위치 입력 형식 오류 */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
    };
  };
  RecommendationsController_recommend: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['RecommendRequestDto'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['RecommendationsResponseDto'];
        };
      };
      /** @description 잘못된 입력 */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
      /** @description 추천 데이터에 없는 도서 */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
      /** @description Python/LLM 설정 오류 또는 추천 작업 과다 */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
      /** @description 추천 작업 시간 초과 */
      504: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ErrorDto'];
        };
      };
    };
  };
}
export enum PathsApiHealthLiveGetResponses200ContentApplicationJsonStatus {
  ok = 'ok',
}
export enum PathsApiBooksGetParametersQueryMaterial {
  printed_book = 'printed_book',
}
export enum PathsApiBooksGetParametersQueryField {
  title = 'title',
  any = 'any',
  creator = 'creator',
  isbn = 'isbn',
}
export enum EstimatedCellDtoSide {
  A = 'A',
  B = 'B',
}
export enum EstimatedCellDtoRing {
  inner = 'inner',
  outer = 'outer',
}
export enum EstimatedCellDtoSideDirection {
  clockwise = 'clockwise',
  counterclockwise = 'counterclockwise',
}
export enum LocationGuideDtoStatus {
  estimated = 'estimated',
  ambiguous = 'ambiguous',
  special = 'special',
  unmapped = 'unmapped',
}
export enum HoldingDtoAvailability {
  available = 'available',
  unavailable = 'unavailable',
  unknown = 'unknown',
}
export enum CopyDtoStatus {
  available = 'available',
  on_loan = 'on_loan',
  unavailable = 'unavailable',
  unknown = 'unknown',
}
export enum RecommendedBookDtoCatalogStatus {
  matched = 'matched',
  not_found = 'not_found',
  unavailable = 'unavailable',
  skipped = 'skipped',
}
export enum ApiPaths {
  AppController_live = '/api/health/live',
  CatalogController_search = '/api/books',
  CatalogController_detail = '/api/books/{recordId}',
  CatalogController_items = '/api/books/{recordId}/holdings/{holdingId}/items',
  LocationController_estimate = '/api/locations/estimate',
  RecommendationsController_recommend = '/api/recommendations',
}
