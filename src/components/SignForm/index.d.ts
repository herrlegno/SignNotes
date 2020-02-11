import { Moment } from 'moment';

export interface SignFormProps {
  day: Moment;
}

export interface SignFormState {
  changed: boolean;
  start: string | undefined;
  end: string | undefined;
}
