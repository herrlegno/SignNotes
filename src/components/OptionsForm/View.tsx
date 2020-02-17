import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { OptionsFormState } from './index.d';
import styles from './styles.module.css';

const OptionsForm: React.FC = () => {
  const lsOpts = JSON.parse(
    localStorage.getItem('options') as string,
  );

  const [options, setOptions] = useState<OptionsFormState>(
    lsOpts
      ? {
          ...lsOpts,
          changed: false,
        }
      : {
          changed: false,
          weeklyHours: 0,
        },
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOptions({ ...options, changed: true, [name]: value });
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    if (e.preventDefault) e.preventDefault();
    const { changed, ...newOptions } = options;
    localStorage.setItem('options', JSON.stringify(newOptions));
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
            value={String(options.weeklyHours)}
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
