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
const TimeTableSport = Loadable({
  loader: () => import('Components/TimeTableSport'),
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
    // console.log('badge select date', d.format('DD'));
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
    const { date, areas, areasGroup } = this.props;

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

        {/* Group TimeTable */}
        {areasGroup &&
          areasGroup.map(el => {
            const times = areas.filter(f => f.area.id === el.area.id);
            const area = times[0].area;

            console.log('times', times);
            console.log('area', area);

            const timesTable = times.map(({ time }) => {
              const start = moment(time.start).startOf('hour');
              const weekParsed = WeekParseHelper(time.week);

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
              disabledMapped.push({
                value: moment(cur),
                type: 'available',
              });
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

                  const pastDate = today.diff(valueMapped) > 0;
                  if (pastDate) return disabled;
                  return e;
                })
                .filter(({ type }) => type !== 'available');

              const disabledMappedAPI = [
                ...disabledMapped,
                ...(time.disabled || []),
              ];

              return {
                area,
                time,
                disabledMappedAPI,
              };
            });

            // const { onSelectArea, onSelectTime } = this.props;
            //   return (
            //     <Col
            //       key={`${selectedDate.format('DD-MM')}-${
            //         area.id
            //       }-${Math.random()}`}
            //       span={24}
            //     >
            //       <TimeTableSport
            //         onClick={() => onSelectArea(area)}
            //         title={area.label}
            //         start={times.start}
            //         stop={time.stop}
            //         interval={time.interval || DEFAULT_INTERVAL_TIME}
            //         onSelect={onSelectTime}
            //         disabled={disabledMappedAPI}
            //       />
            //     </Col>
            //   );

            console.log('timesTable', timesTable);

            // return timesTable.map(el => el);
          })}

        {/* TimeTable */}
        {/* {areas &&
          areas.map(e => {
            const { area, time } = e;
            const start = moment(time.start).startOf('hour');
            const weekParsed = WeekParseHelper(e.time.week);xw

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

                const pastDate = today.diff(valueMapped) > 0;
                if (pastDate) return disabled;
                return e;
              })
              .filter(({ type }) => type !== 'available');

            const disabledMappedAPI = [
              ...disabledMapped,
              ...(time.disabled || []),
            ];

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
                  interval={time.interval || DEFAULT_INTERVAL_TIME}
                  onSelect={onSelectTime}
                  disabled={disabledMappedAPI}
                />
              </Col>
            );
          })} */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (rootReducers: RootReducersType) => {
  const { SportReducers } = rootReducers;
  const { dateSelected, maxForward, areas, areasGroup } = SportReducers;
  return {
    date: {
      selected: dateSelected,
      start: moment().startOf('day'),
      stop: moment()
        .startOf('day')
        .add(maxForward - 1, 'day'),
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
