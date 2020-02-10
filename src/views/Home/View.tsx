import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import moment from '@app/config/moment';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';

import styles from './styles.module.css';
import { Calendar } from '@app/components';

const HomeView: React.FunctionComponent = () => {
  const date = useSelector((state: RootState) => state.date);
  const momentDate = moment(date);
  const monthName = momentDate.format('MMMM');
  return (
    <Container className='pt-4 pb-4' bsPrefix='container-md'>
      <Row className='justify-content-md-center'>
        <Col xs>
          <div className='d-flex border-bottom pb-2 align-items-center justify-content-between'>
            <Link to='/options'>
              <FontAwesomeIcon icon={faCog} size='2x' />
            </Link>
            <h1 className={styles.header}>{monthName}</h1>
            <div />
          </div>
        </Col>
      </Row>
      <Row>
        <Calendar />
      </Row>
    </Container>
  );
};

export default HomeView;
