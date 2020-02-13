import React from 'react';
import { Accordion } from 'react-bootstrap';
import classNames from 'classnames';
import { SignButtons, HoursTracker } from '@app/components';
import { DayCellViewProps } from '../../index.d';
import styles from './styles.module.css';

const DayCellMobileView: React.FC<DayCellViewProps> = ({
  day,
  today,
  isWeekend,
}) => {
  const eventKey = day.format('DD-MM-YYYY');

  return (
    <div
      className={classNames(
        'border-left border-right border-top',
        styles.container,
      )}
    >
      <Accordion.Toggle
        as='div'
        className={styles.button}
        eventKey={eventKey}
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
          <div
            className={classNames(styles.separator, {
              [styles.today]: today,
            })}
          />
          <div className={styles.afterSeparator} />
        </div>
        <HoursTracker day={day} />
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={eventKey}>
        <div className={classNames(styles.body, 'border-top')}>
          {today && <SignButtons day={day} />}
        </div>
      </Accordion.Collapse>
    </div>
  );
};

export default DayCellMobileView;
