import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { signUpdate } from '@app/reducers/signs/actions';
import { useDispatch } from 'react-redux';
import { SignUpdatePayload } from '@app/reducers/signs/types';
import { SignFormProps, SignFormState } from './index.d';
import styles from './styles.module.css';

const SignForm: React.FC<SignFormProps> = ({ day }) => {
  const [data, setData] = useState<SignFormState>({
    changed: false,
    start: undefined,
    end: undefined,
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

  const isFormSubmittable = (data.start || data.end) && data.changed;

  return (
    <Form className={styles.form} onSubmit={handleOnSubmit}>
      <div className={styles.inputsContainer}>
        <InputGroup className={styles.inputGroup}>
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
        <InputGroup className={styles.inputGroup}>
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
