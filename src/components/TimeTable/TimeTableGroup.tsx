import { Col, Row } from 'antd';
import moment, { Moment } from 'moment';
import React, { Component } from 'react';
import BreakingLine from '../BreakingLine';
import Outline from '../Outline';
import styles from './styles.module.css';
// interfaces
import TimeNode from './timetable.interface';

const selectingStyle: React.CSSProperties = {
  backgroundColor: '#1890FF',
  color: '#FFFFFF',
  border: '1px solid #1890FF',
};

const disabledStyle: React.CSSProperties = {
  backgroundColor: '#DADADA',
  color: '#979797',
  border: ' 1px solid #979797',
};

interface TimeTableGroupState {
  table: TimeNode[];
}

interface TimeTableGroupProps {
  selected?: TimeNode[];
  start: Moment[];
  stop: Moment[];
  interval: number[];
  disabled?: Array<TimeNode[]>;
  title?: string;
  onSelect: (value: Moment, type: TimeNode['type']) => void;
  onClick?: () => void;
  enableEndTrim?: boolean;
}

const cardStyle = (type: TimeNode['type']): React.CSSProperties => {
  switch (type) {
    case 'disabled':
      return disabledStyle;
    case 'selecting':
      return selectingStyle;
    default:
      return {};
  }
};

export default class TimeTableGroup extends Component<
  TimeTableGroupProps,
  TimeTableGroupState
> {
  constructor(props: TimeTableGroupProps) {
    super(props);
    this.state = {
      table: [],
    };
  }

  onSelect = (value: Moment, type: TimeNode['type']): void => {
    this.props.onSelect(value, type);
  };

  render() {
    const {
      start,
      stop,
      interval,
      disabled,
      selected,
      enableEndTrim,
    } = this.props;

    let table: TimeNode[] = [];

    start.forEach((_e, i) => {
      let cur = moment(start[i]).subtract(interval[i], 'minute'); // fix not start with correct time e.g. [1, 3] -> [1,2,3]
      const stopWithTrim = moment(stop[i]).subtract(
        enableEndTrim ? interval[i] : 0,
        'minute',
      );

      do {
        table.push({
          value: cur,
          type: 'available',
        });
        cur = moment(cur.add(interval[i], 'minute'));
      } while (cur < stopWithTrim);

      const selectedMapped = selected?.map(e =>
        moment(e.value).format('HH.mm'),
      );
      const disabledMapped =
        disabled &&
        disabled[i] &&
        disabled[i]?.map(e => moment(e.value).format('HH.mm'));

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
    });

    return (
      <React.Fragment>
        {/* outliner */}
        <Outline style={{ margin: 0 }}>
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
                  key={`${value.format(
                    'DD-MM-YYYY HH:mm',
                  )}-${type}-${Math.random().toString()}`}
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
