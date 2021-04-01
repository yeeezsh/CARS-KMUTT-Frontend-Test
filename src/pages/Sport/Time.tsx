import { Col, Row } from 'antd';
import EmptyIcon from 'Assets/icons/area/empty.svg';
import blueSquareIcon from 'Assets/icons/square/blue.svg';
import greySquareIcon from 'Assets/icons/square/grey.svg';
import orangeSquareIcon from 'Assets/icons/square/orange.svg';
import Badge from 'Components/Badge';
import BreakingLine from 'Components/BreakingLine';
import Outline from 'Components/Outline';
import TimeNode from 'Components/TimeTable/timetable.interface';
import moment, { Moment } from 'moment';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import Area from 'Services/area/@interfaces/area.available.interface';
import { RootReducersType } from 'Store/reducers';
import WeekParseHelper from 'Utils/week.parse';
import styles from './styles.module.css';

const DEFAULT_INTERVAL_TIME = 60;

const BadgeDateSelector = Loadable({
  loader: () => import('Components/BadgeDateSelector'),
  loading: () => null,
});

const TimeTableGroup = Loadable({
  loader: () => import('Components/TimeTable/TimeTableGroup'),
  loading: () => null,
});

const iconLabel: React.CSSProperties = {
  color: '#3B4046',
  fontSize: '14px',
  marginLeft: '5px',
  marginTop: '14px',
};

// custom components
const iconSquare = (text?: string, icon?: string) => (
  <div style={{ display: 'flex', padding: '0px 10px 0px 10px' }}>
    <img src={icon} alt="icon" />
    <p style={iconLabel}>{text || ''}</p>
  </div>
);

const EMPTY_TEXT_MSG = 'ไม่สามารถจองได้';
const Empty: React.FC = () => (
  <>
    <Col span={24}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img style={{ width: '30%', marginTop: '36px' }} src={EmptyIcon} />
      </div>
    </Col>
    <Col span={24}>
      <p style={{ textAlign: 'center', marginTop: '8px' }}>
        {EMPTY_TEXT_MSG}
      </p>
    </Col>
  </>
);

interface OwnProps {
  onSelectDate: (date: Moment) => void;
  onSelectTime: (time: Moment, type: TimeNode['type']) => void;
  onSelectArea: (area: Area['area']) => void;
}

// class TimePage extends Component<TimeAreaReserveType> {
class TimePage extends Component<OwnProps & StateProps, any> {
  onSelectDate = (d: Moment) => {
    return this.setState({ selectedDate: d }, () =>
      this.props.onSelectDate(d),
    );
  };

  render() {
    const { selected: selectedDate } = this.props.date;

    const now = moment(new Date());
    const today = now;
    const selectedWeek = Number(moment(selectedDate).format('E'));

    const nonAvailableWeek = this.props.areas
      .map(e => e.time.week)
      .map(e => WeekParseHelper(e))
      .map(e => e.some(w => w === selectedWeek))
      .every(e => e === false);

    let reserveSlot: number[] = this.props.areas.map(
      e => e.time.interval || DEFAULT_INTERVAL_TIME,
    );
    reserveSlot = reserveSlot.filter(
      (e, i) => reserveSlot.indexOf(e) === i,
    );

    let unit: 'ชั่วโมง' | 'นาที' = 'นาที';
    const useHourUnit = reserveSlot.some(e => e >= DEFAULT_INTERVAL_TIME);
    if (useHourUnit) {
      unit = 'ชั่วโมง';
      reserveSlot = reserveSlot.map(e => e / DEFAULT_INTERVAL_TIME);
    }
    const reserveDesc = reserveSlot.join(', ') + ' ' + unit;
    const { date, areasGroup, areas } = this.props;

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

        {/* Empty Icon */}
        {nonAvailableWeek && (
          <Col span={24}>
            <Row type="flex" justify="center">
              <Empty />
            </Row>
          </Col>
        )}

        {/* TimeTable Group */}
        {areasGroup &&
          areasGroup.map(group => {
            const groupArea = areas.filter(
              fg => fg.area.id === group.area.id,
            );

            console.log('groupArea');
            console.log(groupArea);
            groupArea
              .map(el => el.time.start.format('HH:mm'))
              .forEach(el => console.log(el));
            groupArea
              .map(el => el.time.stop.format('HH:mm'))
              .forEach(el => console.log(el));

            const groups: {
              area: Area['area'];
              start: Moment[];
              stop: Moment[];
              interval: number[];
              disabled: TimeNode[][];
            } = {
              area: group.area,
              start: [],
              stop: [],
              interval: [],
              disabled: [],
            };

            groupArea.forEach(e => {
              console.log('groupArea.forEach');
              console.log(e);
              const start = moment(e.time.start);
              console.log('start', start.format('HH:mm'));
              groups.start.push(start);
              console.log('stop', e.time.stop.format('HH:mm'));
              const stop = moment(e.time.stop);
              groups.stop.push(stop);
              const interval = e.time.interval;
              groups.interval.push(interval || 60);

              const weekParsed = WeekParseHelper(e.time.week);

              if (!weekParsed.includes(selectedWeek)) return null;

              let disabledMapped: TimeNode[] = [];
              const cur = moment(start);
              while (cur <= stop) {
                disabledMapped.push({
                  value: moment(cur),
                  type: 'available',
                });
                cur.add(interval || 60, 'minute');
              }
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

                  const pastDate =
                    today.diff(valueMapped) >= 0 &&
                    selectedDate.format('DD') === today.format('DD');
                  if (pastDate) return disabled;
                  return e;
                })
                .filter(({ type }) => type !== 'available');

              const disabledMappedAPI = [
                ...disabledMapped,
                ...(e.time.disabled || []),
              ];

              groups.disabled.push(disabledMappedAPI);
            });

            console.log('mapped groups', groups);
            console.log(groups.start[0].format('HH:mm'));
            console.log(groups.stop[0].format('HH:mm'));
            console.log('\n\n\n');

            const { onSelectArea, onSelectTime } = this.props;

            return (
              !nonAvailableWeek && (
                <Col
                  key={`${selectedDate.format('DD-MM')}-${
                    group.area.id
                  }-${Math.random()}`}
                  span={24}
                >
                  <TimeTableGroup
                    onClick={() => onSelectArea(group.area)}
                    title={groups.area.label}
                    start={groups.start}
                    stop={groups.stop}
                    interval={groups.interval || DEFAULT_INTERVAL_TIME}
                    onSelect={onSelectTime}
                    disabled={groups.disabled}
                  />
                </Col>
              )
            );
          })}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (rootReducers: RootReducersType) => {
  const { SportReducers } = rootReducers;
  const { dateSelected, maxForward, areas, areasGroup } = SportReducers;
  const stopWithOffsetDay = maxForward - 1;
  return {
    date: {
      selected: dateSelected,
      start: moment().startOf('day'),
      stop: moment()
        .startOf('day')
        .add(stopWithOffsetDay, 'day'),
    },
    areas,
    areasGroup,
  };
};

interface StateProps {
  date: {
    start: Moment;
    stop: Moment;
    selected: Moment;
  };
  areas: Area[];
  areasGroup: Area[];
}

export default connect(mapStateToProps, {})(TimePage);
