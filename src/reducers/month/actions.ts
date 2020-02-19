import { NEXT_MONTH, PREV_MONTH, MonthActionType } from './types';

export function nextMonth(): MonthActionType {
  return {
    type: NEXT_MONTH,
  };
}

export function prevMonth(): MonthActionType {
  return {
    type: PREV_MONTH,
  };
}
