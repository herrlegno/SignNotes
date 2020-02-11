import React from 'react';
import classNames from 'classnames';
import { DayCellViewProps } from '../../index.d';
import styles from './styles.module.css';

const DayCellMobileView: React.FC<DayCellViewProps> = ({
  day,
  today,
  isWeekend,
}) => {
  return (
    <div
      className={classNames(styles.button)}
      role='button'
      // onClick={handleShow}
    >
      <div>
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
        <div
          className={classNames(styles.separator, {
            [styles.today]: today,
          })}
        />
        <div className={styles.afterSeparator} />
      </div>
      <div>--:--</div>
    </div>
  );
};

export default DayCellMobileView;
