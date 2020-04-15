import { Moment } from 'moment';
import { ButtonProps } from 'react-bootstrap';

export type HolidayButtonProps = ButtonProps & {
  day: Moment;
};
