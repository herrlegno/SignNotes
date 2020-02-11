import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import {
  Modal,
  Button,
  Accordion,
  Card,
  InputGroup,
  Form,
} from 'react-bootstrap';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import { useMediaQuery } from '@app/hooks';
import { DayCellProps } from './index.d';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const DayCell: React.FC<DayCellProps> = ({ day, today }) => {
  const { months } = useSelector((state: RootState) => state.date);
  const [show, setShow] = useState<boolean>(false);
  const { mobile } = useMediaQuery();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ref = useRef<HTMLButtonElement>(null);

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
  }, [mobile]);

  const disabled = !(months === day.month());
  const isWeekend = day.day() === 0 || day.day() === 6;

  return (
    <div className={classNames(styles.container)}>
      {!mobile && (
        <button
          ref={ref}
          className={classNames(styles.button, styles.date, {
            [styles.active]: !disabled,
            [styles.weekend]: isWeekend,
            [styles.today]: !mobile && today,
          })}
          onClick={handleShow}
          disabled={disabled}
        >
          {day.format('DD')}
          <div className={styles.dayName}>{day.format('ddd')}</div>
        </button>
      )}
      {mobile && (
        <div
          className={classNames(styles.button, {
            [styles.buttonMobile]: mobile,
          })}
          role='button'
          onClick={handleShow}
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
      )}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{day.format('ll')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex flex-column align-items-center'>
            <div className={styles.timer}>--:--</div>
            <div className={styles.buttonsGrid}>
              <Button variant='success'>Llegada</Button>
              <Button variant='danger'>Salida</Button>
            </div>
            <Accordion className={styles.accordion}>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey='0'>
                  Opciones Avanzadas
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={styles.icon}
                  />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <Card.Body>
                    <Form className={styles.optionForm}>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text
                            id={`label-signin-time-${day.format(
                              'DD-MM-YYYY',
                            )}`}
                          >
                            Hora de llegada
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type='time'
                          id={`input-signin-time-${day.format(
                            'DD-MM-YYYY',
                          )}`}
                          aria-describedby={`label-signin-time-${day.format(
                            'DD-MM-YYYY',
                          )}`}
                        />
                      </InputGroup>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text
                            id={`label-signout-time-${day.format(
                              'DD-MM-YYYY',
                            )}`}
                          >
                            Hora de salida
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type='time'
                          id={`input-signout-time-${day.format(
                            'DD-MM-YYYY',
                          )}`}
                          aria-describedby={`label-signout-time-${day.format(
                            'DD-MM-YYYY',
                          )}`}
                        />
                      </InputGroup>
                      <Button
                        className={styles.submitButton}
                        variant='primary'
                        type='submit'
                      >
                        Guardar
                      </Button>
                    </Form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DayCell;
