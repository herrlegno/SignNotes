import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import { Modal, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { DayCellProps } from './index.d';
import { useMediaQuery } from '@app/hooks';
import styles from './styles.module.css';

const DayCell: React.FC<DayCellProps> = ({ day, month }) => {
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

  const disabled = !(month === day.month());

  return (
    <div
      className={classNames(styles.container, {
        [styles.mobile]: mobile,
      })}
    >
      {!mobile && (
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
              <Modal.Title>{day.format('ll')}</Modal.Title>
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
      )}
      {mobile && <React.Fragment>{day.format('DD')}</React.Fragment>}
    </div>
  );
};

export default DayCell;
