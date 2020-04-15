import React from 'react';
import moment from '@app/config/moment';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import classNames from 'classnames';
import styles from './styles.module.css';
import { Duration } from 'moment';

const format = (num: number) => {
  return num.toString().padStart(2, '0');
};

const WeekReport: React.FC<any> = ({ week }) => {
  const signings = useSelector((state: RootState) => state.signings);
  const hours = useSelector(
    (state: RootState) => state.options.weeklyHours,
  );

  const formatBalance = (balance: Duration) => {
    const status = balance.hours() < 0 || balance.minutes() < 0;
    let hours = balance.hours() + balance.days() * 24;
    let minutes = balance.minutes();

    if (hours < 0) {
      hours *= -1;
    }
    if (minutes < 0) {
      minutes *= -1;
    }

    return `${status ? '+' : '-'}${format(hours)}:${format(minutes)}`;
  };

  const start = moment().week(week).startOf('week');
  const end = moment(start).week(week).endOf('week');

  const weekNumber = week - moment(start).startOf('month').week();

  const hoursDone = moment.duration(0);
  const weeklyHours = Number(hours);
  const weeklyDuration = moment.duration(weeklyHours, 'hours');

  for (let i = moment(start); i < end; i.add(1, 'd')) {
    const daySign = signings[i.format('DD-MM-YYYY')];

    if (daySign?.holiday) {
      hoursDone.add(moment.duration(weeklyHours / 5, 'hours'));
    } else {
      const signIn = moment(daySign?.in);
      const signOut = moment(daySign?.out);

      const duration = moment.duration(signOut.diff(signIn));
      hoursDone.add(duration);
    }
  }

  const balance = weeklyDuration.subtract(hoursDone);
  const status = balance.hours() < 0 || balance.minutes() < 0;

  return (
    <div className={styles.container}>
      <div>{`Semana ${weekNumber}`}</div>
      <div
        className={classNames({
          [styles.positive]: !status,
          [styles.negative]: status,
        })}
      >
        {formatBalance(balance)}
      </div>
    </div>
  );
};

export default WeekReport;
