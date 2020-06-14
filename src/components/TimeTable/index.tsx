import React, { Component } from 'react';
import { Row, Col } from 'antd';
import moment, { Moment } from 'moment';
import TimeNode from './timetable.interface';

import styles from './styles.module.css';

import Outline from '../Outline';
import BreakingLine from '../BreakingLine';

const selecting: React.CSSProperties = {
  backgroundColor: '#1890FF',
  color: '#FFFFFF',
  border: '1px solid #1890FF',
};

const disabled: React.CSSProperties = {
  backgroundColor: '#DADADA',
  color: '#979797',
  border: ' 1px solid #979797',
};

interface TimeTableState {
  table: TimeNode[];
}

interface TimeTableProps {
  selected?: TimeNode[];
  start: Moment;
  stop: Moment;
  interval: number;
  disabled?: TimeNode[];
  onSelect: (value: Moment, type: TimeNode['type']) => any;
  title?: string;
  onClick?: any;
}

const cardStyle = (type: TimeNode['type']): React.CSSProperties => {
  switch (type) {
    case 'disabled':
      return disabled;
    case 'selecting':
      return selecting;
    default:
      return {};
  }
};

export default class TimeTable extends Component<
  TimeTableProps,
  TimeTableState
> {
  constructor(props: TimeTableProps) {
    super(props);
    this.state = {
      table: [],
    };
  }

  onSelect = (
    value: Moment,
    type: TimeNode['type'],
  ): {
    value: Moment;
    type: TimeNode['type'];
  } => {
    return this.props.onSelect(value, type);
  };

  render() {
    const { start, stop, interval, disabled, selected } = this.props;
    let table: TimeNode[] = [];
    let cur = moment(start).subtract(interval, 'minute'); // fix not start with correct time e.g. [1, 3] -> [1,2,3]
    const stopWithTrim = stop.subtract(interval, 'minute');

    do {
      table.push({
        value: cur,
        type: 'available',
      });
      cur = moment(cur.add(interval, 'minute'));
    } while (cur < stopWithTrim);

    const selectedMapped = selected?.map(e =>
      moment(e.value).format('HH.mm'),
    );
    const disabledMapped = disabled?.map(e =>
      moment(e.value).format('HH.mm'),
    );
    table = table.map(e => {
      const typeDisabled = disabledMapped?.includes(
        e.value.format('HH.mm'),
      );
      const typeSelected = selectedMapped?.includes(
        e.value.format('HH.mm'),
      );
      if (typeDisabled) {
        return {
          ...e,
          type: 'disabled',
        };
      }
      if (typeSelected) {
        return {
          ...e,
          type: 'selecting',
        };
      }
      return e;
    });

    return (
      <React.Fragment>
        {/* outliner */}
        <Outline>
          <span style={{ fontSize: '14px' }}>
            {this.props.title || 'Unknown'}
          </span>
        </Outline>

        {/* timetable */}
        <Row type="flex" justify="start">
          {table[0] &&
            table.map(({ value, type }) => {
              return (
                <Row
                  className={styles.table}
                  key={`${value.format('DD-MM-YYYY HH:mm')}`}
                  onClick={() => {
                    this.onSelect(value, type);
                    this.props.onClick && this.props.onClick();
                  }}
                  type="flex"
                  justify="center"
                >
                  <p style={cardStyle(type)} className={styles.card}>
                    {value.format('HH.mm')}
                  </p>
                </Row>
              );
            })}
        </Row>

        {/* borderline */}
        <Col span={24}>
          <BreakingLine lineSize={0.5} />
        </Col>
      </React.Fragment>
    );
  }
}
