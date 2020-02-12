import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import moment from '@app/config/moment';
import classNames from 'classnames';
import { HoursTrackerProps, TimeElapsed } from './index.d';
import styles from './styles.module.css';

const format = (num: number) => {
  return num.toString().padStart(2, '0');
};

const HoursTracker: React.FC<HoursTrackerProps> = ({ day }) => {
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

  const timer = useRef<number>();

  const calculateDiff = (start: number, end: number): TimeElapsed => {
    const startMoment = moment(start);
    const endMoment = moment(end);
    const diff = moment.duration(endMoment.diff(startMoment));
    return {
      hours: diff.hours(),
      minutes: diff.minutes(),
    };
  };

  let initialTime: TimeElapsed = {
    hours: 0,
    minutes: 0,
  };
  if (start >= 0 && end >= 0) {
    initialTime = calculateDiff(start, end);
  }

  if (start >= 0 && end === -1) {
    const now = moment().valueOf();
    initialTime = calculateDiff(start, now);
  }

  const [elapsed, setElapsed] = useState<TimeElapsed>(initialTime);

  useEffect(() => {
    let timeout = 0;

    if (start >= 0 && end >= 0) {
      const update = calculateDiff(start, end);
      setElapsed(update);
    }

    if (start >= 0 && end === -1) {
      const updateTimer = () => {
        const now = moment().valueOf();
        const update = calculateDiff(start, now);
        setElapsed(update);
      };

      const minuteOffset = moment().valueOf() % 60000;
      const timeoutTime = 60000 - minuteOffset;

      updateTimer();
      timeout = window.setTimeout(() => {
        updateTimer();
        timer.current = window.setInterval(updateTimer, 60000);
      }, timeoutTime);
    }

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(timer.current);
    };
  }, [end, start]);

  const isTimerActive = start >= 0 && end === -1;
  const started = start >= 0;

  return (
    <div
      className={classNames(styles.timer, {
        [styles.blinkAnim]: isTimerActive,
      })}
    >
      {!started && '-:-'}
      {started &&
        `${format(elapsed.hours)}:${format(elapsed.minutes)}`}
    </div>
  );
};

export default HoursTracker;
