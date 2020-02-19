import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setOptions as setReduxOptions } from '@app/reducers/options/actions';
import { RootState } from '@app/reducers';
import { OptionsFormState } from './index.d';
import styles from './styles.module.css';

const OptionsForm: React.FC = () => {
  const reduxOps = useSelector((state: RootState) => state.options);
  const dispatch = useDispatch();

  const [options, setOptions] = useState<OptionsFormState>(
    reduxOps
      ? {
          ...reduxOps,
          changed: false,
        }
      : {
          changed: false,
          weeklyHours: '0',
        },
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOptions({ ...options, changed: true, [name]: value });
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    if (e.preventDefault) e.preventDefault();
    const { changed, ...newOptions } = options;
    dispatch(setReduxOptions(newOptions));
  };

  const isFormSubmittable = options.changed;

  return (
    <Form
      className={classNames(styles.form, 'mt-3')}
      onSubmit={handleOnSubmit}
    >
      <div className={styles.inputsContainer}>
        <InputGroup>
          <InputGroup.Prepend className={styles.inputPrepend}>
            <InputGroup.Text
              id='weeklyHoursLabel'
              className={styles.prependText}
            >
              Horas semanales
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            id={`weeklyHoursInput`}
            aria-describedby='weeklyHoursLabel'
            name='weeklyHours'
            type='number'
            value={options.weeklyHours}
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

export default OptionsForm;
