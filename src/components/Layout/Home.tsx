import React, { Component } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import Loadable from 'react-loadable';

// interfaces
import { Task } from '../../models/task/task.interface';

import styles from './home.module.css';

const StateCard = Loadable({
  loader: () => import('../StateCard'),
  loading: () => null,
});

const Home: React.FunctionComponent<{ lastCard?: Task }> = props => {
  const day = moment();
  const dayName = day.format('ddd');
  const date = day.format('D');
  const month = day.format('MMMM');
  const year = day.format('YYYY');

  const { lastCard } = props;
  console.log('laygout home last card', lastCard);
  const LastCard: React.FunctionComponent = () => (
    <StateCard
      name={lastCard ? lastCard?.area.label || lastCard?.area.name : undefined}
      reserve={
        lastCard
          ? {
              date: lastCard?.reserve[0].start,
              start: lastCard?.reserve[0].start,
              stop: lastCard?.reserve[0].stop,
              state: {
                type: lastCard?.state[lastCard.state.length - 1],
                desc: lastCard.desc,
              },
            }
          : undefined
      }
    />
  );

  return (
    <React.Fragment>
      <Row type="flex" justify="center" className={styles.header}>
        <Col className={styles.title} span={12}>
          <p className={styles.white}>หน้าแรก</p>
        </Col>
      </Row>

      {/* spacing */}
      <div style={{ height: 325 }}></div>

      {/* bg color */}
      <div
        style={{
          backgroundColor: '#ff682b',
          position: 'fixed',
          height: '335px',
          width: '100%',
          top: 0,
        }}
      ></div>

      {/* date and time */}
      <Row className={styles.date}>
        <div className={styles.textDate}>Today</div>
        <div className={styles.textDate}>
          {dayName}, {date} {month} {year}
        </div>
      </Row>

      {/* card */}
      <Row type="flex" justify="center">
        <Col span={23}>
          <LastCard />
        </Col>
      </Row>

      {/* content */}
      <Row style={{ marginTop: 20, padding: 0 }}>
        <Col className={styles.content}>{props.children}</Col>
      </Row>
    </React.Fragment>
  );
};

export default Home;
