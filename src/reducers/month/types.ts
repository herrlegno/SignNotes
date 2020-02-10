export const NEXT_MONTH = 'MONTH/NEXT_MONTH';
export const PREV_MONTH = 'MONTH/PREV_MONTH';

interface NextMonthAction {
  type: typeof NEXT_MONTH;
}

interface PrevMonthAction {
  type: typeof PREV_MONTH;
}

export type MonthActionType = NextMonthAction | PrevMonthAction;
