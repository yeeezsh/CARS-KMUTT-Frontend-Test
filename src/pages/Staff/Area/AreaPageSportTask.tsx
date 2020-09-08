import { Col, message, Row } from 'antd';
import Button from 'Components/Button';
import StaffLayout from 'Components/Layout/Staff/Home';
import TimeTable from 'Components/TimeTable';
import TimeNode from 'Components/TimeTable/timetable.interface';
import confirmButton from 'Models/button/confirm.button';
import disabledButton from 'Models/button/disabled.button';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { areaAPI } from 'Services/area';
import { AreaAvailableAPI } from 'Services/area/area.interface';
import { AreaAPI } from 'Services/area/interfaces';
import { taskAPI } from 'Services/task';
import { CreateTaskByStaff } from 'Services/task/task.create.interface';
import { QuickTask as QuickTaskInterface } from 'Services/task/task.quick.interface';
import { u } from 'Services/user';
import cardStyle from './common/card.style';
import AreaInfo from './Info';
import QuickTask from './QuickTask';

const AreaPageSport: React.FC = () => {
  const { pathname } = useLocation();
  const areaId = pathname.split('/')[3];

  const initSelecting: TimeNode[][] = [[]];
  const [selecting, setSelecting] = useState(initSelecting);
  const initAvailArea: AreaAvailableAPI[] = [];
  const [availArea, setAvailArea] = useState(initAvailArea);
  const [canReserve, setCanReserve] = useState(false);
  // const [modal, setModal] = useState(false);
  const initQuickTask: QuickTaskInterface[] = [];
  const [quickTask, setQuickTask] = useState(initQuickTask);
  const [loading, setLoading] = useState<boolean>(true);

  const initAreaInfo: AreaAPI = {
    _id: '',
    label: '',
    name: '',
    forward: 0,
    reserve: [],
  };
  const [areaInfo, setAreaInfo] = useState(initAreaInfo);

  async function fetch() {
    setLoading(true);
    // fetch area info
    const area = await areaAPI.getAreaInfo(areaId);
    setAreaInfo(area);

    // fetch avalable
    const available = await areaAPI.getAreaAvailable(areaId);
    setAvailArea(available);
    setSelecting(Array(available.length).fill([]));

    // get quick task
    const quickTask = await taskAPI.getQuickTask(
      area._id,
      moment().startOf('day'),
      moment()
        .startOf('day')
        .add(area.forward, 'day'),
    );
    setQuickTask(quickTask);
    setLoading(false);
  }

  // fetch when start
  useEffect(() => {
    fetch();
  }, []);

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

      fetch();
      onCancel();
      return message.success('จองสำเร็จ');
    } catch (err) {
      fetch();
      return message.error(String(err));
    }
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

        <Col style={cardStyle} span={11}>
          <Row>
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

            <QuickTask data={quickTask} loading={loading} />
          </Row>
        </Col>

        {/* right side */}
        <Col style={cardStyle} span={11}>
          {/* time table area */}
          {areaInfo.reserve[0] &&
            availArea.map((e, i) => {
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
            })}

          {/* Action */}
          <Col span={12}>
            <Button {...disabledButton} onClick={onCancel}>
              ยกเลิก
            </Button>
          </Col>
          <Col span={12}>
            {canReserve ? (
              <Button {...confirmButton} onClick={onReserve}>
                จอง
              </Button>
            ) : (
              <Button {...disabledButton}>จอง</Button>
            )}
          </Col>
        </Col>
      </Row>
    </StaffLayout>
  );
};

export default AreaPageSport;
