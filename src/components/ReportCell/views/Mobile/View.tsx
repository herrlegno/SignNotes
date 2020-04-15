import React from 'react';
import classNames from 'classnames';
import { SignTimes } from '@app/components';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import { ReportCellViewProps } from '../../index.d';
import styles from './styles.module.css';

const ReportCellMobileView: React.FC<ReportCellViewProps> = ({
  day,
  isWeekend,
}) => {
  const holiday = useSelector(
    (state: RootState) =>
      state.signings[day.format('DD-MM-YYYY')]?.holiday,
  );

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
        {holiday && (
          <FontAwesomeIcon
            className={styles.icon}
            icon={faCalendarTimes}
          />
        )}
        {!holiday && <SignTimes day={day} className={styles.times} />}
      </div>
    </div>
  );
};

export default ReportCellMobileView;
