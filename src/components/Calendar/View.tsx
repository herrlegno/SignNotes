import React from 'react';
import { Container } from 'react-bootstrap';
import moment from '@app/config/moment';
import classNames from 'classnames';
import { DayCell } from '@app/components';
import { nextMonth, prevMonth } from '@app/reducers/month/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@app/hooks';
import styles from './styles.module.css';

const Calendar: React.FC = () => {
  const { mobile } = useMediaQuery();
  const dispatch = useDispatch();
  const date = useSelector((state: RootState) => state.date);

  const handleNextMonth = () => dispatch(nextMonth());
  const handlePrevMonth = () => dispatch(prevMonth());

  function obtainDays() {
    const calendarStart = moment(date).startOf('month');
    const calendarEnd = moment(date).endOf('month');

    if (!mobile) {
      calendarStart.startOf('week');
      calendarEnd.endOf('week');
    }

    const days = [];

    for (
      let i = moment(calendarStart);
      i <= calendarEnd;
      i.add(1, 'd')
    ) {
      days.push(i.clone());
    }

    return days;
  }

  const days = obtainDays();

  return (
    <Container className='mt-3' bsPrefix='container-md'>
      <div
        className={classNames({
          [styles.controlsGrid]: !mobile,
        })}
      >
        <button
          className={styles.controlButton}
          onClick={handlePrevMonth}
        >
          <FontAwesomeIcon icon={faChevronLeft} size='2x' />
          {mobile && 'Mes anterior'}
        </button>
        <div
          className={classNames({
            [styles.calendarGrid]: !mobile,
          })}
        >
          {days.map((day, dayIndex) => (
            <div
              key={day.format('DD-MM-YYYY')}
              className={classNames(
                'border-bottom border-right text-center',
                {
                  'border-left': !(dayIndex % 7) || mobile,
                  'border-top':
                    (mobile && dayIndex === 0) ||
                    (dayIndex < 7 && !mobile),
                },
              )}
            >
              <DayCell day={day} />
            </div>
          ))}
        </div>
        <button
          className={styles.controlButton}
          onClick={handleNextMonth}
        >
          {mobile && 'Siguiente mes'}
          <FontAwesomeIcon icon={faChevronRight} size='2x' />
        </button>
      </div>
    </Container>
  );
};

export default Calendar;
