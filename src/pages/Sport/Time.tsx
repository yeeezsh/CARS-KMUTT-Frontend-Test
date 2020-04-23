import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import moment, { Moment } from 'moment';
import { Col, Row } from 'antd';

const BadgeDateSelector = Loadable({
  loader: () => import('Components/BadgeDateSelector'),
  loading: () => null,
});
const TimeTable = Loadable({
  loader: () => import('Components/TimeTable'),
  loading: () => null,
});

import BreakingLine from 'Components/BreakingLine';
import Outline from 'Components/Outline';
import Badge from 'Components/Badge';

import styles from './styles.module.css';

import orangeSquareIcon from 'Assets/icons/square/orange.svg';
import greySquareIcon from 'Assets/icons/square/grey.svg';
import blueSquareIcon from 'Assets/icons/square/blue.svg';

// interfaces
import TimeNode from 'Components/TimeTable/timetable.interface';
import Area from 'Models/area/area.interface';

// helpers
import WeekParseHelper from './helpers/week.parse';

const iconLabel: React.CSSProperties = {
  color: '#3B4046',
  fontSize: '14px',
  marginLeft: '5px',
  marginTop: '14px',
};

const iconSquare = (text?: string, icon?: string) => (
  <div style={{ display: 'flex', padding: '0px 10px 0px 10px' }}>
    <img src={icon} alt="icon" />
    <p style={iconLabel}>{text || ''}</p>
  </div>
);

interface OwnProps {
  onSelectDate: any;
  onSelectTime: any;
  onSelectArea: any;
}

// class TimePage extends Component<TimeAreaReserveType> {
class TimePage extends Component<OwnProps & StateProps, any> {
  // state = {
  //   selectedDate: moment(new Date()),
  // };

  onSelectDate = (d: Moment) => {
    // console.log('badge select date', d.format('DD'));
    return this.setState({ selectedDate: d }, () =>
      this.props.onSelectDate(d),
    );
  };
  // componentDidMount = () => {
  //   const selectedDate = this.props.date.selected;
  //   this.setState({ selectedDate });
  // };

  render() {
    // console.log('time : ', this.props);
    // console.log('time component', this.state.selectedDate.format('DD'));
    // const { selectedDate } = this.state;
    const { selected: selectedDate } = this.props.date;

    const now = moment(new Date());
    const today = now;
    const selectedWeek = Number(moment(selectedDate).format('E'));

    let reserveSlot: number[] = this.props.areas.map(
      e => e.time.interval || 60,
    );
    reserveSlot = reserveSlot.filter(
      (e, i) => reserveSlot.indexOf(e) === i,
    );

    let unit: 'ชั่วโมง' | 'นาที' = 'นาที';
    const useHourUnit = reserveSlot.some(e => e >= 60);
    if (useHourUnit) {
      unit = 'ชั่วโมง';
      reserveSlot = reserveSlot.map(e => e / 60);
    }
    const reserveDesc = reserveSlot.join(', ') + ' ' + unit;
    const { date, areas } = this.props;
    return (
      <React.Fragment>
        {/* outliner n' desc */}
        <Col style={{ marginTop: '-10px' }} span={24}>
          <Row type="flex" justify="start">
            {/* outliner */}
            <Outline>เลือกช่วงเวลา</Outline>

            {/* description */}
            <Col className={styles.desc} span={24}>
              <p>
                เลือกช่วงเวลาที่ต้องการจอง สามารถจองได้ครั้งละ{' '}
                {reserveDesc}
              </p>
            </Col>

            {/* borderline */}
            <Col span={24}>
              <BreakingLine />
            </Col>
          </Row>

          {/* BadgeDaySelector */}
          <Col span={24}>
            <BadgeDateSelector
              start={date.start}
              stop={date.stop}
              select={selectedDate}
              onSelect={this.onSelectDate}
            />
          </Col>
        </Col>

        {/* spacing */}
        <Col span={24}>
          <div style={{ height: '8px' }} />
        </Col>

        {/* Date Outliner */}
        <Col style={{ marginBottom: '-20px' }} span={24}>
          <Row type="flex" justify="center">
            <Badge>
              <span
                style={{
                  color: '#FF682B',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
              >
                วันที่ {date.selected.format('DD MMMM YYYY')}
              </span>
            </Badge>
          </Row>
        </Col>

        {/* icon detail */}
        <Col span={24}>
          <Row type="flex" justify="center">
            {iconSquare('ว่าง', orangeSquareIcon)}
            {iconSquare('ไม่ว่าง/รอการอนุมัติ', greySquareIcon)}
            {iconSquare('ที่ถูกเลือก', blueSquareIcon)}
          </Row>
        </Col>

        {/* TimeTable */}
        {areas &&
          areas.map(e => {
            const { area, time } = e;
            const start = moment(time.start).startOf('hour');
            const weekParsed = WeekParseHelper(e.time.week);
            // console.log(weekParsed, selectedWeek, weekParsed.includes(selectedWeek));
            if (!weekParsed.includes(selectedWeek)) return null;

            let disabledMapped: TimeNode[] = [];
            const cur = start;
            while (cur <= time.stop) {
              disabledMapped.push({
                value: moment(cur),
                type: 'available',
              });
              cur.add(time.interval || 60, 'minute');
            }
            disabledMapped.push({ value: moment(cur), type: 'available' });
            disabledMapped = disabledMapped
              .map(e => {
                const valueMapped = moment(
                  e.value.format('HH.mm'),
                  'HH.mm',
                ).set('date', Number(selectedDate.format('DD')));
                const disabled: TimeNode = {
                  type: 'disabled',
                  value: moment(valueMapped),
                };
                // console.log(disabled.value.format('HH:mm DD-MM-YYY'), 'd - t', today.format('HH:mm DD-MM-YYY'));
                // console.log(today.diff(valueMapped));
                const pastDate = today.diff(valueMapped) > 0;
                // console.log('pastdate', pastDate);
                if (pastDate) return disabled;

                return e;
              })
              .filter(({ type }) => type !== 'available');
            // console.log('dsm', disabledMapped);
            // console.log(today, selectedDate.format('DD'), e.time.forward);
            const disabledMappedAPI = [
              ...disabledMapped,
              ...(time.disabled || []),
            ];

            // console.log('wowza', `${selectedDate.format('DD-MM')}-${e.area.id}`);
            const { onSelectArea, onSelectTime } = this.props;
            return (
              <Col
                key={`${selectedDate.format('DD-MM')}-${
                  e.area.id
                }-${Math.random()}`}
                span={24}
              >
                <TimeTable
                  onClick={() => onSelectArea(e.area)}
                  title={area.label}
                  start={time.start}
                  stop={time.stop}
                  interval={time.interval || 60}
                  onSelect={onSelectTime}
                  disabled={disabledMappedAPI}
                />
              </Col>
            );
          })}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (rootReducers: any): StateProps => {
  const { SportReducers } = rootReducers;
  const { dateSelected, maxForward, areas } = SportReducers;
  return {
    date: {
      selected: dateSelected,
      start: moment().startOf('day'),
      stop: moment()
        .startOf('day')
        .add(maxForward - 1, 'day'),
    },
    areas,
  };
};

interface StateProps {
  date: {
    start: Moment;
    stop: Moment;
    selected: Moment;
  };
  areas: Area[];
}

export default connect<StateProps, {}, OwnProps>(
  mapStateToProps,
  {},
)(TimePage);
