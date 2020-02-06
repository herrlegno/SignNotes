import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { DayCellProps } from './index.d';
import styles from './styles.module.css';

const DayCell: React.FC<DayCellProps> = ({ day, month }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOnResize = () => {
      const button = ref.current as HTMLButtonElement;
      button.style.height = `${button.offsetWidth}px`;
    };

    if (ref.current) handleOnResize();

    window.addEventListener('resize', handleOnResize);

    return () => {
      window.removeEventListener('resize', handleOnResize);
    };
  });

  const disabled = !(month === day.month());

  return (
    <React.Fragment>
      <button
        ref={ref}
        className={classNames(styles.button, {
          [styles.active]: !disabled,
        })}
        onClick={handleShow}
        disabled={disabled}
      >
        {day.format('DD')}
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you're reading this text in a modal!
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default DayCell;
