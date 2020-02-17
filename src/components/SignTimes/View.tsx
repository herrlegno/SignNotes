import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import moment from '@app/config/moment';
import classNames from 'classnames';
import { SignTimesProps } from './index.d';
import styles from './styles.module.css';

const format = (num: number) => {
  return num.toString().padStart(2, '0');
};

const SignTimes: React.FC<SignTimesProps> = ({ day, className }) => {
  const start =
    useSelector(
      (state: RootState) =>
        state.signings[day.format('DD-MM-YYYY')]?.in,
    ) || -1;
  const end =
    useSelector(
      (state: RootState) =>
        state.signings[day.format('DD-MM-YYYY')]?.out,
    ) || -1;

  const renderTime = (day: number) => {
    if (day === -1)
      return (
        <div className={classNames(className, styles.timer)}>-:-</div>
      );

    const momentDay = moment(day);
    return (
      <div className={classNames(className, styles.timer)}>
        {`${format(momentDay.hours())}:${format(
          momentDay.minutes(),
        )}`}
      </div>
    );
  };

  return (
    <div>
      {renderTime(start)}
      {renderTime(end)}
    </div>
  );
};

export default SignTimes;
