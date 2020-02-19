import React from 'react';
import { OptionsForm } from '@app/components';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

const OptionsView: React.FunctionComponent = () => {
  return (
    <Container className='pt-4'>
      <Row className='justify-content-md-center'>
        <Col xs>
          <div className='d-flex border-bottom pb-2 align-items-center justify-content-between'>
            <Link to='/' className={styles.icon}>
              <FontAwesomeIcon icon={faChevronLeft} size='2x' />
            </Link>
            <h1 className={styles.header}>Configuración</h1>
            <div />
          </div>
        </Col>
      </Row>
      <Row className='justify-content-center ml-1 mr-1'>
        <OptionsForm />
      </Row>
    </Container>
  );
};

export default OptionsView;
