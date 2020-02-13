import React from 'react';
import { signIn, signOut } from '@app/reducers/signs/actions';
import { Button } from 'react-bootstrap';
import moment from '@app/config/moment';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import { SignButtonsProps } from './index.d';
import styles from './styles.module.css';

const SignButtons: React.FC<SignButtonsProps> = ({ day }) => {
  const dispatch = useDispatch();
  const start =
    useSelector(
      (state: RootState) =>
        state.signings[day.format('DD-MM-YYYY')]?.in,
    ) || -1;
  const end =
    useSelector(
      (state: RootState) =>
        state.signings[day.format('DD-MM-YYYY')]?.out,
    ) || -1;

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

  const isToday = moment().date() === day.date();
  const signedIn = start >= 0;
  const signedOut = end >= 0;

  return (
    <div className={styles.container}>
      <Button
        variant='success'
        onClick={handleOnSignIn}
        disabled={signedIn || !isToday}
      >
        Llegada
      </Button>
      <Button
        variant='danger'
        onClick={handleOnSignOut}
        disabled={signedOut || !signedIn || !isToday}
      >
        Salida
      </Button>
    </div>
  );
};

export default SignButtons;
