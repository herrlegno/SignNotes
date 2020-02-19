import { Moment } from 'moment';

export interface DayCellProps {
  day: Moment;
  today?: boolean;
  mobile?: boolean;
}

export type DayCellViewProps = DayCellProps & {
  isWeekend: boolean;
  disabled?: boolean;
};
