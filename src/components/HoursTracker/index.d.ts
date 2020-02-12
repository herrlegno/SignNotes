import { Moment } from 'moment';

export interface HoursTrackerProps {
  day: Moment;
}

export interface TimeElapsed {
  hours: number;
  minutes: number;
}
