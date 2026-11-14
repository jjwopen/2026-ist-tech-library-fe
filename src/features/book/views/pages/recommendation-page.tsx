import { useTranslation } from 'react-i18next';

import { PageShell, TopBar } from '@/common/components/layout';

import { useRecommendations } from '../../viewmodels';
import { RecRow } from '../components/rec-row';

/** S5 추천 */
export function RecommendationPage({ bookId }: RecommendationPage.Props) {
  const { t } = useTranslation('book');
  const { target, recommendations } = useRecommendations(bookId);

  return (
    <PageShell>
      <TopBar bordered={false}>
        <div className="flex min-w-0 flex-col">
          <h1 className="text-h2">{t('recommendation.title')}</h1>
          <p className="text-meta text-sub truncate">
            {t('recommendation.basis', { title: target.title })}
          </p>
        </div>
      </TopBar>

      {recommendations.length > 0 ? (
        recommendations.map((recommendation) => (
          <RecRow key={recommendation.rank} recommendation={recommendation} />
        ))
      ) : (
        <p className="border-ink text-body-lg text-sub border-t py-24 text-center">
          {t('recommendation.empty')}
        </p>
      )}
    </PageShell>
  );
}

export namespace RecommendationPage {
  export type Props = {
    bookId: string;
  };
}
