import React from 'react';
import { Toast } from 'react-bootstrap';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { NotificationProps, NotificationType } from './index.d';
import styles from './styles.module.css';

const Notification: React.FC<NotificationProps> = ({
  data,
  close,
}) => {
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success': {
        return faCheckCircle;
      }
      case 'warning': {
        return faExclamationTriangle;
      }
      case 'error': {
        return faExclamationCircle;
      }
      default: {
        return faInfoCircle;
      }
    }
  };

  return (
    <Toast
      className={classNames(styles.notification, styles[data.type])}
      show={data.show}
      onClose={() => close(data.id)}
      autohide
    >
      <Toast.Header className={styles.header}>
        <div className={styles.textContainer}>
          <FontAwesomeIcon
            icon={getIcon(data.type)}
            className={classNames(styles.icon, styles[data.type])}
          />
          <p className={styles.text}>{data.message}</p>
        </div>
      </Toast.Header>
    </Toast>
  );
};

export default Notification;
