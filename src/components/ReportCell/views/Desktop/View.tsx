import React, { useEffect, useRef, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { useMediaQuery } from '@app/hooks';
import { SignTimes } from '@app/components';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import { ReportCellViewProps } from '../../index.d';
import styles from './styles.module.css';

const ReportCellDesktop: React.FC<ReportCellViewProps> = ({
  day,
  isWeekend,
  disabled,
}) => {
  const { sm } = useMediaQuery();
  const ref = useRef<HTMLDivElement>(null);

  const holiday = useSelector(
    (state: RootState) =>
      state.signings[day.format('DD-MM-YYYY')]?.holiday,
  );

  const updateHeight = () => {
    const button = ref.current as HTMLDivElement;
    button.style.height = `${button.clientWidth}px`;
  };

  useEffect(() => {
    const handleOnResize = () => {
      if (ref.current) updateHeight();
    };

    window.addEventListener('resize', handleOnResize);
    return () => {
      window.removeEventListener('resize', handleOnResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (ref.current) updateHeight();
  }, []);

  return (
    <React.Fragment>
      <div
        ref={ref}
        className={classNames(styles.cell, styles.date, {
          [styles.weekend]: isWeekend,
          [styles.disabled]: disabled || holiday,
          [styles.sm]: sm,
        })}
      >
        <div className={styles.dayName}>{day.format('ddd')}</div>
        {holiday && (
          <FontAwesomeIcon
            className={styles.icon}
            icon={faCalendarTimes}
          />
        )}
        {!disabled && !holiday && (
          <SignTimes
            day={day}
            className={classNames({
              [styles.sm]: sm,
              [styles.times]: !sm,
            })}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default ReportCellDesktop;
