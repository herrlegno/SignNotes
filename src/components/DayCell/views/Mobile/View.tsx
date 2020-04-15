import React from 'react';
import { Accordion } from 'react-bootstrap';
import classNames from 'classnames';
import {
  SignButtons,
  HoursTracker,
  SignForm,
  HolidayButton,
} from '@app/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import { DayCellViewProps } from '../../index.d';
import styles from './styles.module.css';

const DayCellMobileView: React.FC<DayCellViewProps> = ({
  day,
  today,
  isWeekend,
}) => {
  const eventKey = day.format('DD-MM-YYYY');

  const holiday = useSelector(
    (state: RootState) =>
      state.signings[day.format('DD-MM-YYYY')]?.holiday,
  );

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
        {holiday ? (
          <FontAwesomeIcon
            className={styles.holiday}
            icon={faCalendarTimes}
          />
        ) : (
          <HoursTracker day={day} />
        )}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={eventKey}>
        <div
          className={classNames(styles.body, 'border-top', {
            'text-center': holiday,
          })}
        >
          {!holiday && (
            <React.Fragment>
              {today && <SignButtons day={day} />}
              {today && (
                <div className={styles.formSeparator}>Manual</div>
              )}
              <SignForm day={day} />
              <div className={styles.formSeparator} />
            </React.Fragment>
          )}
          <HolidayButton variant='outline-dark' day={day} block>
            {' '}
            {holiday ? 'Laboral' : 'Festivo'}
          </HolidayButton>
        </div>
      </Accordion.Collapse>
    </div>
  );
};

export default DayCellMobileView;
