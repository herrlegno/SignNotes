import React from 'react';
import classNames from 'classnames';
import { SignTimes } from '@app/components';
import { ReportCellViewProps } from '../../index.d';
import styles from './styles.module.css';

const ReportCellMobileView: React.FC<ReportCellViewProps> = ({
  day,
  isWeekend,
}) => {
  return (
    <div
      className={classNames(
        'border-left border-right border-bottom',
        styles.cell,
      )}
    >
      <div className={styles.dateContainer}>
        <div
          className={classNames(styles.date, {
            [styles.weekend]: isWeekend,
          })}
        >
          {day.format('DD')}
        </div>
        <div className={styles.dayName}>{day.format('ddd')}</div>
      </div>
      <div className={styles.separatorContainer}>
        <div className={styles.beforeSeparator} />
        <div className={classNames(styles.separator)} />
        <div className={styles.afterSeparator} />
      </div>
      <div>
        <SignTimes day={day} className={styles.times} />
      </div>
    </div>
  );
};

export default ReportCellMobileView;
