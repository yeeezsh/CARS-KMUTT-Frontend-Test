import React from 'react';
import { Row, Col } from 'antd';
import { Moment } from 'moment';

// assets
import styles from './styles.module.css';
import StateBlue from '../../assets/icons/state.blue.svg';
import StateYellow from '../../assets/icons/state.yellow.svg';

import { ReserveState } from '../../models/reserve/interface';

export default function StateCard(props: {
  name?: string;
  desc?: string;
  reserve?: {
    date?: Moment;
    start?: Moment;
    stop?: Moment;
    detail?: string;
    state?: {
      type?: ReserveState['type'];
      desc?: string;
    };
  };
}) {
  const { name, reserve } = props;
  const date = reserve?.date;
  const n = date?.format('DD');
  const month = date?.format('MMMM');
  const year = date?.format('YYYY');

  const empty = <p className={styles.empty}>ไม่มีข้อมูลการจอง</p>;
  const range = (
    <span>
      {date?.format('DD MMMM YYYY')} เวลา {reserve?.start?.format('HH:MM')}-{reserve?.stop?.format('HH:MM')} น.
    </span>
  );
  const detail = <span>blabalbalbalbalbals</span>;
  const showCard = (
    <Row>
      <Row type="flex" justify="space-between">
        {/* reservation name */}
        <Col span={12}>
          <p className={styles.title}>{name}</p>
        </Col>

        {/* reservation date */}
        <Col span={12}>
          <p className={styles.date}>
            {n} {month} {year}
          </p>
        </Col>
      </Row>
      <Row className={styles.detail} type="flex">
        <Col span={22}>
          <p>{reserve?.start !== undefined ? range : detail}</p>
        </Col>
      </Row>
      <Row className={styles.detail} type="flex" justify="start">
        <Col span={22}>
          <span className={styles.state}>
            {reserve?.state?.type === 'wait' ? (
              <img src={StateBlue} alt="state-blue" />
            ) : (
              <img src={StateYellow} alt="state-yellow" />
            )}
            <span className={reserve?.state?.type === 'wait' ? styles.blue : styles.yellow} style={{ marginLeft: 5 }}>
              {reserve?.state?.desc}
            </span>
          </span>
        </Col>
      </Row>
    </Row>
  );
  return <div className={styles.card}>{name === undefined ? empty : showCard}</div>;
}
