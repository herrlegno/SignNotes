import React from 'react';
import { signIn, signOut } from '@app/reducers/signs/actions';
import { Button } from 'react-bootstrap';
import moment from '@app/config/moment';
import { useDispatch } from 'react-redux';
import { SignButtonsProps } from './index.d';
import styles from './styles.module.css';

const SignButtons: React.FC<SignButtonsProps> = ({ day }) => {
  const dispatch = useDispatch();

  const handleOnSignIn = () => {
    const now = moment();

    const signature = {
      date: now.set({
        date: day.date(),
        month: day.month(),
        year: day.year(),
      }),
    };

    dispatch(signIn(signature));
  };

  const handleOnSignOut = () => {
    const now = moment();

    const signature = {
      date: now.set({
        date: day.date(),
        month: day.month(),
        year: day.year(),
      }),
    };

    dispatch(signOut(signature));
  };
  return (
    <div className={styles.container}>
      <Button variant='success' onClick={handleOnSignIn}>
        Llegada
      </Button>
      <Button variant='danger' onClick={handleOnSignOut}>
        Salida
      </Button>
    </div>
  );
};

export default SignButtons;
