import { Moment } from 'moment';

export interface DayCellProps {
  day: Moment;
  today?: boolean;
}

export type DayCellViewProps = DayCellProps & {
  isWeekend: boolean;
  disabled?: boolean;
};
