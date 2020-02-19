import React, { useEffect, useRef, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { useMediaQuery } from '@app/hooks';
import { SignTimes } from '@app/components';
import { ReportCellViewProps } from '../../index.d';
import styles from './styles.module.css';

const ReportCellDesktop: React.FC<ReportCellViewProps> = ({
  day,
  isWeekend,
  disabled,
}) => {
  const { sm } = useMediaQuery();
  const ref = useRef<HTMLDivElement>(null);

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
          [styles.disabled]: disabled,
          [styles.sm]: sm,
        })}
      >
        <div className={styles.dayName}>{day.format('ddd')}</div>
        {!disabled && (
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
