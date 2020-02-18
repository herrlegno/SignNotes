import React from 'react';
import { Container } from 'react-bootstrap';
import moment from '@app/config/moment';
import classNames from 'classnames';
import { ReportCell, WeekReport } from '@app/components';
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

const Report: React.FC = () => {
  const { mobile, sm } = useMediaQuery();
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
  const momentDate = moment(date);

  return (
    <Container className='mt-3' bsPrefix='container-md'>
      <div className={styles.controlsGrid}>
        <button
          className={styles.controlButton}
          onClick={handlePrevMonth}
        >
          <FontAwesomeIcon icon={faChevronLeft} size='2x' />
        </button>
        <h1 className={styles.month}>
          {momentDate.format('MMMM YYYY')}
        </h1>
        <button
          className={styles.controlButton}
          onClick={handleNextMonth}
        >
          <FontAwesomeIcon icon={faChevronRight} size='2x' />
        </button>
      </div>

      {/* DESKTOP VIEW */}
      {!mobile && (
        <div
          className={classNames({
            [styles.calendarGrid]: !mobile,
          })}
        >
          {days.map((day, dayIndex) => {
            const week = Math.trunc(dayIndex / 7);
            const weekStart = !(dayIndex % 7);
            return (
              <React.Fragment key={day.format('DD-MM-YYYY')}>
                {weekStart && (
                  <div
                    className={classNames(
                      'border-bottom border-right border-left text-center',
                      styles.weekDesktop,
                      {
                        'border-top':
                          (mobile && weekStart) ||
                          (dayIndex < 7 && !mobile),
                        [styles.sm]: sm,
                      },
                    )}
                  >
                    <WeekReport week={day.week()} />
                  </div>
                )}
                <div
                  className={classNames(
                    'border-bottom border-right text-center',
                    {
                      'border-top':
                        (mobile && dayIndex === 0) ||
                        (dayIndex < 7 && !mobile),
                    },
                  )}
                >
                  <ReportCell day={day} />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/*MOBILE VIEW*/}
      {mobile &&
        days.map((day, dayIndex) => {
          const week =
            day.week() -
            moment(date)
              .startOf('month')
              .week();
          const weekStart = day.day() === 1 || dayIndex === 0;
          return (
            <React.Fragment key={day.format('DD-MM-YYYY')}>
              {weekStart && (
                <div
                  className={classNames(styles.weekHeader, 'border', {
                    'border-top-0': week !== 0,
                  })}
                >
                  <WeekReport week={day.week()} />
                </div>
              )}
              <ReportCell day={day} mobile />
            </React.Fragment>
          );
        })}
    </Container>
  );
};

export default Report;
