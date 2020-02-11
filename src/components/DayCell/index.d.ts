import { Moment } from 'moment';

export interface DayCellProps {
  day: Moment;
  today?: boolean;
}

export interface FormData {
  changed: boolean;
  start: string | undefined;
  end: string | undefined;
}
