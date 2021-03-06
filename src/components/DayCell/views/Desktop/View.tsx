import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import { Modal, Button, Accordion, Card } from 'react-bootstrap';
import {
  SignForm,
  SignButtons,
  HoursTracker,
  HolidayButton,
} from '@app/components';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faCalendarTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import { DayCellViewProps } from '../../index.d';
import styles from './styles.module.css';

const DayCellDesktop: React.FC<DayCellViewProps> = ({
  day,
  today,
  isWeekend,
  disabled,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);

  const holiday = useSelector(
    (state: RootState) =>
      state.signings[day.format('DD-MM-YYYY')]?.holiday,
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateHeight = () => {
    const button = ref.current as HTMLButtonElement;
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
      <button
        ref={ref}
        className={classNames(styles.button, styles.date, {
          [styles.active]: !disabled,
          [styles.weekend]: isWeekend,
          [styles.disabled]: disabled,
          [styles.today]: today,
        })}
        onClick={handleShow}
        disabled={disabled}
      >
        {day.format('DD')}
        <div className={styles.dayName}>{day.format('ddd')}</div>
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <HolidayButton variant='outline-dark' day={day} />
          <Modal.Title className={styles.title}>
            {day.format('ll')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.body}>
            {holiday && (
              <FontAwesomeIcon
                className={styles.holiday}
                icon={faCalendarTimes}
              />
            )}
            {!holiday && (
              <React.Fragment>
                <HoursTracker day={day} />
                {today && !holiday && <SignButtons day={day} />}
                <Accordion className={styles.accordion}>
                  <Card>
                    <Accordion.Toggle
                      as={Card.Header}
                      className={styles.accordionHeader}
                      eventKey='0'
                    >
                      Manual
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={styles.icon}
                      />
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey='0'>
                      <Card.Body>
                        <SignForm day={day} />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </React.Fragment>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default DayCellDesktop;
