import { Col, message, Row } from 'antd';
import Loading from 'Components/Loading';
import TimeNode from 'Components/TimeTable/timetable.interface';
import confirmButton from 'Models/button/confirm.button';
import disabledButton from 'Models/button/disabled.button';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { useLocation } from 'react-router';
import { areaAPI } from 'Services/area';
import { AreaAvailableAPI } from 'Services/area/area.interface';
import { AreaAPI } from 'Services/area/interfaces';
import { taskAPI } from 'Services/task';
import { CreateTaskByStaff } from 'Services/task/task.create.interface';
import { QuickTask as QuickTaskInterface } from 'Services/task/task.quick.interface';
import { u } from 'Services/user';
import cardStyle from './common/card.style';

const AreaInfo = Loadable({
  loading: () => null,
  loader: () => import('./Info'),
});
const QuickTask = Loadable({
  loading: () => null,
  loader: () => import('./QuickTask'),
});
const TimeRangeSelect = Loadable({
  loading: () => null,
  loader: () => import('Components/TimeRangeSelect/TimeRangeSelect'),
});
const TimeTable = Loadable({
  loading: () => null,
  loader: () => import('Components/TimeTable'),
});

const Button = Loadable({
  loading: () => null,
  loader: () => import('Components/Button'),
});
const StaffLayout = Loadable({
  loading: () => null,
  loader: () => import('Components/Layout/Staff/Home'),
});

const AreaPageSport: React.FC = () => {
  const { pathname } = useLocation();
  const areaId = pathname.split('/')[3];

  const today = moment().startOf('day');
  const initSelecting: TimeNode[][] = [[]];
  const [selecting, setSelecting] = useState(initSelecting);
  const [availArea, setAvailArea] = useState<AreaAvailableAPI[]>();
  const [canReserve, setCanReserve] = useState(false);
  // const [modal, setModal] = useState(false);
  const initQuickTask: QuickTaskInterface[] = [];
  const [quickTask, setQuickTask] = useState(initQuickTask);
  const [loading, setLoading] = useState<boolean>(true);
  const [areaInfo, setAreaInfo] = useState<AreaAPI>();

  const [selectedDate, setSelectedDate] = useState<{
    start: Moment;
    stop: Moment;
  }>();

  async function fetch(startDate: Moment, stopDate: Moment) {
    setLoading(true);
    // fetch area info
    const area = areaInfo || (await areaAPI.getAreaInfo(areaId));
    setAreaInfo(area);

    // fetch avalable
    const available = await areaAPI.getAreaAvailable(
      areaId,
      startDate,
      stopDate,
    );
    setAvailArea(available);
    setSelecting(Array(available.length).fill([]));

    // get quick task
    const quickTask = await taskAPI.getQuickTask(
      area._id,
      moment(startDate).startOf('day'),
      moment(stopDate),
    );
    setQuickTask(quickTask);
    setLoading(false);
  }

  // fetch when dateChange
  useEffect(() => {
    selectedDate && fetch(selectedDate.start, selectedDate.stop);
  }, [selectedDate]);

  useEffect(() => {
    fetch(moment(today), moment());
  }, []);

  useEffect(() => {
    setSelectedDate({
      start: moment(today),
      stop: moment(today).add(areaInfo?.forward, 'day'),
    });
  }, [areaInfo]);

  function onSelect(value: Moment, type: TimeNode['type'], i: number) {
    console.log(value, type, i);
    const selectingDay = selecting[i];
    if (type === 'disabled') return;
    if (type === 'available') {
      const d: TimeNode[] = [
        ...selectingDay,
        { value, type: 'selecting' },
      ];
      setSelecting(prev => prev.map((e, ix) => (ix === i ? d : e)));
    }
    if (type === 'selecting') {
      const d: TimeNode[] = selectingDay.filter(
        f => moment(f.value).format('HH:mm') !== value.format('HH:mm'),
      );
      setSelecting(prev => prev.map((e, ix) => (ix === i ? d : e)));
    }
  }

  function onCancel() {
    setSelecting(prev => prev.map(() => []));
  }

  async function onReserve() {
    try {
      const parser: CreateTaskByStaff = {
        time: [],
        area: areaId,
        owner: u.GetUser()._id,
        requestor: [u.GetUser().username],
      };
      if (!areaInfo) throw new Error('need area info');
      const mapped = selecting
        .map(e => ({
          ...parser,
          time: e.map(t => ({
            start: t.value.toDate(),
            stop: t.value
              .add(areaInfo.reserve[0].interval, 'minutes')
              .toDate(),
            allDay: false,
          })),
        }))
        .filter(e => e.time.length > 0);

      await Promise.all(
        mapped.map(e => taskAPI.createSportTaskByStaff(e)),
      );

      selectedDate && fetch(selectedDate.start, selectedDate.stop);
      onCancel();
      return message.success('จองสำเร็จ');
    } catch (err) {
      selectedDate && fetch(selectedDate.start, selectedDate.stop);
      return message.error(String(err));
    }
  }

  function onSelectDate(start: Moment, stop: Moment) {
    setSelectedDate({ start, stop });
  }

  // subscribe seclecting to change can reserve states
  useEffect(() => {
    const validReserve = selecting.some(e => e.length >= 1);
    console.log('can reserved', validReserve);
    if (validReserve) return setCanReserve(true);
    return setCanReserve(false);
  }, [selecting]);

  return (
    <StaffLayout>
      <Row justify="space-around" type="flex">
        {/* left side */}

        <Col style={cardStyle} span={13}>
          <Row>
            {areaInfo ? (
              <AreaInfo
                building={areaInfo.building?.label}
                area={areaInfo.label}
                time={{
                  start: areaInfo.reserve[0] && areaInfo.reserve[0].start,
                  stop: areaInfo.reserve[0] && areaInfo.reserve[0].stop,
                }}
                week={areaInfo.reserve[0] && areaInfo.reserve[0].week}
                forward={areaInfo.forward}
                required={areaInfo.required?.requestor}
              />
            ) : (
              <Loading />
            )}

            <QuickTask data={quickTask} loading={loading} />
          </Row>
        </Col>

        {/* right side */}
        <Col style={cardStyle} span={10}>
          {areaInfo ? (
            <TimeRangeSelect
              now={today}
              forward={areaInfo.forward}
              onSelect={onSelectDate}
            />
          ) : (
            <Loading />
          )}
          {/* time table area */}
          {areaInfo && areaInfo.reserve[0] ? (
            availArea &&
            availArea.map((e, i) => {
              if (i === 0) return; // HOT FIX OFFSET DATE
              return (
                <TimeTable
                  selected={selecting[i]}
                  title={'วันที่ ' + e.date.format('DD-MM-YYYY')}
                  disabled={e.disabled || []}
                  onSelect={(selectTime, type) =>
                    onSelect(
                      moment(
                        e.date.format('DD-MM-YYYY') +
                          '-' +
                          selectTime.format('HH:mm'),
                        'DD-MM-YYYY-HH:mm',
                      ),
                      type,
                      i,
                    )
                  }
                  key={i}
                  start={areaInfo.reserve[0].start}
                  stop={areaInfo.reserve[0].stop}
                  interval={areaInfo.reserve[0].interval}
                />
              );
            })
          ) : (
            <Loading />
          )}

          {/* Action */}
          <Col span={24} style={{ marginTop: '18px' }}>
            <Row type="flex" justify="space-around">
              <Col span={11}>
                <Button {...disabledButton} padding={6} onClick={onCancel}>
                  ยกเลิก
                </Button>
              </Col>
              <Col span={11}>
                {canReserve ? (
                  <Button
                    {...confirmButton}
                    padding={6}
                    onClick={onReserve}
                  >
                    จอง
                  </Button>
                ) : (
                  <Button {...disabledButton} padding={6}>
                    จอง
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
    </StaffLayout>
  );
};

export default AreaPageSport;
