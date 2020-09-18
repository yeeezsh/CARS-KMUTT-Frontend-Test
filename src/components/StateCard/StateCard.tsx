import { Col, Row } from 'antd';
import { Moment } from 'moment';
import React from 'react';
import Loadable from 'react-loadable';
import { ReserveState } from 'Services/reserve/interface';
import { TaskStateType } from 'Services/task/task.interface';
// assets
import styles from './styles.module.css';

const StateCardIconColor = Loadable({
  loader: () => import('./StateCardIconColor'),
  loading: () => null,
});

export default function StateCard(props: {
  name?: string;
  desc?: string;
  reserve?: {
    date?: Moment;
    start?: Moment;
    stop?: Moment;
    detail?: string;
    state?: {
      type?: ReserveState;
      desc?: string;
    };
    createAt?: Moment;
  };
}) {
  const { name, reserve } = props;
  const createAtLabel = reserve?.date;
  const n = createAtLabel?.format('DD');
  const month = createAtLabel?.format('MMMM');
  const year = createAtLabel?.format('YYYY');

  const empty = <p className={styles.empty}>ไม่มีข้อมูลการจอง</p>;
  const range = (
    <span>
      {createAtLabel?.format('DD MMMM YYYY')} เวลา{' '}
      {reserve?.start?.format('HH:mm')}-{reserve?.stop?.format('HH:mm')} น.
    </span>
  );
  const detail = <span>No detail</span>;

  const showCard = (
    <Row>
      <Row type="flex" justify="space-between">
        {/* reservation name */}
        <Col span={18}>
          <p className={styles.title}>{name}</p>
        </Col>

        {/* reservation date */}
        <Col span={6}>
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
            <StateCardIconColor
              type={reserve?.state?.type || TaskStateType.wait}
              desc={reserve?.state?.desc}
            />
          </span>
        </Col>
      </Row>
    </Row>
  );

  // final render
  return (
    <div className={styles.card}>
      {name === undefined ? empty : showCard}
    </div>
  );
}
