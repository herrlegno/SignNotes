import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import { useDispatch } from 'react-redux';
import { setHoliday } from '@app/reducers/signs/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarTimes,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import { HolidayButtonProps } from './index.d';

const HolidayButton: React.FC<HolidayButtonProps> = ({
  day,
  children,
  ...props
}) => {
  const dispatch = useDispatch();
  const holiday = useSelector(
    (state: RootState) =>
      state.signings[day.format('DD-MM-YYYY')]?.holiday,
  );

  const handleOnClick = () =>
    dispatch(setHoliday({ date: day }, !holiday));

  return (
    <Button {...props} onClick={handleOnClick}>
      <FontAwesomeIcon
        icon={holiday ? faCalendarCheck : faCalendarTimes}
      />
      {children}
    </Button>
  );
};
export default HolidayButton;
