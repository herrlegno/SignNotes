import { Moment } from 'moment';

export interface HoursTrackerProps {
  day: Moment;
  className?: string;
}

export interface TimeElapsed {
  hours: number;
  minutes: number;
}
