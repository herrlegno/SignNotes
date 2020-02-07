import React from 'react';
import { Container } from 'react-bootstrap';
import moment from '@app/config/moment';
import classNames from 'classnames';
import { DayCell } from '@app/components';
import { useMediaQuery } from '@app/hooks';
import { CalendarProps } from './index.d';
import styles from './styles.module.css';

const Calendar: React.FC<CalendarProps> = ({ month }) => {
  const { mobile } = useMediaQuery();

  function obtainDays(month: number) {
    const calendarStart = moment()
      .month(month)
      .startOf('month')
      .startOf('week');
    const calendarEnd = moment()
      .month(month)
      .endOf('month')
      .endOf('week');

    const days = [];

    for (
      let i = moment(calendarStart);
      i <= calendarEnd;
      i.add(1, 'd')
    ) {
      days.push(moment(i));
    }

    return days;
  }

  const daysNames = moment.weekdays(true);

  const days = obtainDays(month);

  const weeksCount = days.length / 7;

  return (
    <Container className='mt-3' bsPrefix='container-md'>
      <div
        className={classNames({
          [styles.calendarGrid]: !mobile,
        })}
      >
        {daysNames.map((day, index) => (
          <div
            key={day}
            className={classNames(
              styles.day,
              'border-bottom border-right text-center',
              {
                'border-right-0': index === daysNames.length - 1,
              },
            )}
          >
            {day}
          </div>
        ))}
        {[...Array(weeksCount)].map((_, weekIndex) =>
          [...Array(7)].map((__, dayIndex) => {
            const day = days[weekIndex * 7 + dayIndex];
            return (
              <div
                key={day.format('DD-MM-YYYY')}
                className={classNames(
                  'border-bottom border-right text-center',
                  {
                    'border-left': dayIndex === 0,
                  },
                )}
              >
                <DayCell day={day} month={month} />
              </div>
            );
          }),
        )}
      </div>
    </Container>
  );
};

export default Calendar;
