import React from 'react';
import moment from '@app/config/moment';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';

const format = (num: number) => {
  return num.toString().padStart(2, '0');
};

const WeekReport: React.FC<any> = ({ week }) => {
  const signings = useSelector((state: RootState) => state.signings);
  const start = moment()
    .week(week)
    .startOf('week');
  const end = moment(start)
    .week(week)
    .endOf('week');

  const balance = moment.duration(0);

  for (let i = moment(start); i < end; i.add(1, 'd')) {
    const daySign = signings[i.format('DD-MM-YYYY')];
    if (daySign) {
      const signIn = moment(daySign.in);
      const signOut = moment(daySign.out);

      const duration = moment.duration(signOut.diff(signIn));
      console.log(duration.hours(), duration.minutes());
      balance.add(duration);
    }
  }

  return (
    <div>
      <div>{start.format('DD-MM-YYYY')}</div>
      <div>{end.format('DD-MM-YYYY')}</div>
      <div>{`${format(balance.hours())}:${format(
        balance.minutes(),
      )}`}</div>
    </div>
  );
};

export default WeekReport;
