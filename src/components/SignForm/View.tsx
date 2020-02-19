import React, { useState, useEffect } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { signUpdate } from '@app/reducers/signs/actions';
import { useDispatch } from 'react-redux';
import { SignUpdatePayload } from '@app/reducers/signs/types';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import moment from '@app/config/moment';
import { SignFormProps, SignFormState } from './index.d';
import styles from './styles.module.css';

const formatToHour = (date: number) => {
  const momentDate = moment(date);
  const format = [
    momentDate
      .hours()
      .toString()
      .padStart(2, '0'),
    momentDate
      .minutes()
      .toString()
      .padStart(2, '0'),
  ].join(':');

  return format;
};

const SignForm: React.FC<SignFormProps> = ({ day }) => {
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

  const [data, setData] = useState<SignFormState>({
    changed: false,
    start: start >= 0 ? formatToHour(start) : undefined,
    end: end >= 0 ? formatToHour(end) : undefined,
  });

  const dispatch = useDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, changed: true, [name]: value });
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    if (e.preventDefault) e.preventDefault();
    const { start, end } = data;

    if (start || end) {
      const sign: SignUpdatePayload = {
        date: day.clone(),
      };

      if (start) {
        const startSign = start.split(':').map(i => Number(i));
        sign['in'] = day.clone().set({
          hour: startSign[0],
          minute: startSign[1],
          second: 0,
          millisecond: 0,
        });
      }

      if (end) {
        const endSign = end.split(':').map(i => Number(i));
        sign['out'] = day.clone().set({
          hour: endSign[0],
          minute: endSign[1],
          second: 0,
          millisecond: 0,
        });
      }

      dispatch(signUpdate(sign));
    }
  };

  useEffect(() => {
    setData({
      changed: false,
      start: start >= 0 ? formatToHour(start) : undefined,
      end: end >= 0 ? formatToHour(end) : undefined,
    });
  }, [start, end]);

  const isFormSubmittable = (data.start || data.end) && data.changed;

  return (
    <Form className={styles.form} onSubmit={handleOnSubmit}>
      <div className={styles.inputsContainer}>
        <InputGroup>
          <InputGroup.Prepend className={styles.inputPrepend}>
            <InputGroup.Text
              id={`label-signin-time-${day.format('DD-MM-YYYY')}`}
              className={styles.prependText}
            >
              Llegada
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            id={`input-signin-time-${day.format('DD-MM-YYYY')}`}
            aria-describedby={`label-signin-time-${day.format(
              'DD-MM-YYYY',
            )}`}
            name='start'
            type='time'
            value={data.start}
            onChange={handleOnChange}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Prepend className={styles.inputPrepend}>
            <InputGroup.Text
              id={`label-signout-time-${day.format('DD-MM-YYYY')}`}
              className={styles.prependText}
            >
              Salida
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            id={`input-signout-time-${day.format('DD-MM-YYYY')}`}
            aria-describedby={`label-signout-time-${day.format(
              'DD-MM-YYYY',
            )}`}
            name='end'
            type='time'
            value={data.end}
            onChange={handleOnChange}
          />
        </InputGroup>
      </div>
      <Button
        className={styles.submitButton}
        variant='primary'
        type='submit'
        disabled={!isFormSubmittable}
      >
        Guardar
      </Button>
    </Form>
  );
};

export default SignForm;
