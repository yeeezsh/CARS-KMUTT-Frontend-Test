import React from 'react';
import { Row, Col } from 'antd';
import { Moment } from 'moment';
import Loadable from 'react-loadable';

// assets
import styles from './styles.module.css';
import { ReserveState } from '../../models/reserve/interface';

const StateCardIconColor = Loadable({
  loader: () => import('./icon'),
  loading: () => null,
});

export default function StateCard(props: {
  name?: string | undefined;
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
  const createAtLabel = reserve?.createAt;
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
            <StateCardIconColor
              type={reserve?.state?.type || 'drop'}
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
