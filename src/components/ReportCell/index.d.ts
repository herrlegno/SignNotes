import { Moment } from 'moment';

export interface ReportCellProps {
  day: Moment;
  mobile?: boolean;
}

export type ReportCellViewProps = ReportCellProps & {
  isWeekend: boolean;
  disabled?: boolean;
};
