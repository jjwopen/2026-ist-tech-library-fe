import { StatusMark } from '@/common/components/ui';

import { type Book } from '../../../viewmodels';
import { useBookLabels } from '../../hooks';

/** 대출 상태 표시 (대출 가능 / 대출 중 · 반납 예정일) */
export function LoanStatusMark({ loan, className }: LoanStatusMark.Props) {
  const labels = useBookLabels();
  return <StatusMark label={labels.loan(loan)} active={loan.available} className={className} />;
}

export namespace LoanStatusMark {
  export type Props = {
    loan: Book['loan'];
    className?: string;
  };
}
