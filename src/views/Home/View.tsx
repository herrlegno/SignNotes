import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import moment from '@app/config/moment';
import styles from './styles.module.css';

const HomeView: React.FunctionComponent = () => {
  const month = moment().format('MMMM');
  return (
    <Container className='pt-4'>
      <Row className='justify-content-md-center'>
        <Col xs>
          <div className='d-flex border-bottom pb-2 align-items-center justify-content-between'>
            <Link to='/options'>
              <FontAwesomeIcon icon={faCog} size='2x' />
            </Link>
            <h1 className={classNames('ml-2', styles.header)}>
              {month}
            </h1>
            <div />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeView;
