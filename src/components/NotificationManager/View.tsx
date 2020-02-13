import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import {
  pushNotification,
  removeNotification,
} from '@app/reducers/notifications/actions';
import { Notification } from '@app/components';
import { StateNotification } from './index.d';
import styles from './styles.module.css';

const NotificationManager = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications,
  );

  const [state, setState] = useState<StateNotification[]>([]);

  const sortFunction = (
    a: StateNotification,
    b: StateNotification,
  ) => {
    return a.id - b.id;
  };

  const handleOnAdd = () => {
    dispatch(pushNotification({ type: 'success' }));
    dispatch(pushNotification({ type: 'warning' }));
    dispatch(pushNotification({ type: 'error' }));
    dispatch(pushNotification({ type: 'info' }));
  };

  const handleOnClose = (id: number) => {
    const notification = state.find(
      notification => notification.id === id,
    );

    if (notification) {
      const rest = state.filter(
        notification => notification.id !== id,
      );
      notification.show = false;

      const newState = [...rest, { ...notification }].sort(
        sortFunction,
      );

      setState(newState);
    }
  };

  useEffect(() => {
    const stateNotifications = notifications.map(notification => ({
      ...notification,
      show: true,
    }));
    setState(stateNotifications);
  }, [notifications]);

  useEffect(() => {
    const notificationsToRemove = state.filter(
      notifications => !notifications.show,
    );

    notificationsToRemove.forEach(notification => {
      dispatch(removeNotification(notification.id));
    });
  }, [state, dispatch]);

  return (
    <div
      aria-live='polite'
      aria-atomic='true'
      className={styles.manager}
    >
      <button onClick={handleOnAdd}>añadir notificacion</button>
      {state.map(notification => (
        <Notification data={notification} close={handleOnClose} />
      ))}
    </div>
  );
};

export default NotificationManager;
