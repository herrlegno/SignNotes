import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Report } from '@app/components';
import styles from './styles.module.css';

const ReportView: React.FC = () => {
  return (
    <Container className='pt-4'>
      <Row className='justify-content-md-center'>
        <Col xs>
          <div className='d-flex border-bottom pb-2 align-items-center justify-content-between'>
            <Link to='/' className={styles.icon}>
              <FontAwesomeIcon icon={faChevronLeft} size='2x' />
            </Link>
            <h1 className={styles.header}>Informe</h1>
            <div />
          </div>
        </Col>
      </Row>
      <Row>
        <Report />
      </Row>
    </Container>
  );
};

export default ReportView;
