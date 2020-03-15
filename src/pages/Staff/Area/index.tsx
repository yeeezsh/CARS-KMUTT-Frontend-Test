import React, { useState, useEffect } from 'react';
import { Row, Col, message } from 'antd';
import StaffLayout from 'Components/Layout/Staff/Home';
import { useLocation } from 'react-router';
import TimeTable from 'Components/TimeTable';
import moment, { Moment } from 'moment';
import TimeNode from 'Components/TimeTable/timetable.interface';
import AreaInfo from './Info';
import { areaAPI } from 'Models/area';
import { AreaAvailableAPI } from 'Models/area/area.interface';
import { AreaAPI } from 'Models/area/interfaces';
import QuickTask from './QuickTask';
import Badge from 'Components/Badge';
import Button from 'Components/Button';
import { CreateTaskByStaff } from 'Models/task/task.create.interface';
import { u } from 'Models/user';
import { taskAPI } from 'Models/task';
import { QuickTask as QuickTaskInterface } from 'Models/task/task.quick.interface';

const disabledBtnProps = {
  fontColor: '#979797',
  style: {
    background: '#FFFFFF',
    border: '1px solid #979797',
  },
};

const badgeStyles: React.CSSProperties = {
  marginBottom: 12,
  width: '145px',
  fontSize: '16px',
};

const AreaPage: React.FC = () => {
  const { pathname } = useLocation();
  const areaId = pathname.split('/')[3];

  const initSelecting: TimeNode[][] = [[]];
  const [selecting, setSelecting] = useState(initSelecting);
  const initAvailArea: AreaAvailableAPI[] = [];
  const [availArea, setAvailArea] = useState(initAvailArea);
  const [canReserve, setCanReserve] = useState(false);
  const [modal, setModal] = useState(false);
  const initQuickTask: QuickTaskInterface[] = [];
  const [quickTask, setQuickTask] = useState(initQuickTask);

  const initAreaInfo: AreaAPI = {
    _id: '',
    label: '',
    name: '',
    forward: 0,
    reserve: [],
  };
  const [areaInfo, setAreaInfo] = useState(initAreaInfo);

  function fetch() {
    areaAPI.getAreaInfo(areaId).then(a => {
      setAreaInfo(a);
      // get available
      areaAPI.getAreaAvailable(areaId).then(avail => {
        setAvailArea(avail);
        setSelecting(Array(avail.length).fill([]));
      });

      // get quick task
      taskAPI
        .getQuickTask(
          a._id,
          moment().startOf('day'),
          moment()
            .startOf('day')
            .add(a.forward, 'day'),
        )
        .then(qt => {
          console.log('quick task data', qt);
          setQuickTask(qt);
        });
    });
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
    console.log('maopped ja', mapped);
    const allTask = await Promise.all(
      mapped.map(e => taskAPI.createTaskByStaff(e)),
    );
    console.log('all task res', allTask);
    fetch();
    onCancel();
    return message.success('จองสำเร็จ');
  }

  // subscribe seclecting to change can reserve states
  useEffect(() => {
    const validReserve = selecting.some(e => e.length >= 1);
    console.log('can reserved', validReserve);
    if (validReserve) return setCanReserve(true);
    return setCanReserve(false);
  }, [selecting]);

  console.log('avail list', availArea);
  console.log('selectung', selecting);
  return (
    <StaffLayout>
      <Row gutter={8}>
        {/* left side */}
        <Col span={12}>
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
            <Button onClick={onCancel} {...disabledBtnProps}>
              ยกเลิก
            </Button>
          </Col>
          <Col span={12}>
            {canReserve ? (
              <Button
                onClick={onReserve}
                style={{ background: '#1890FF' }}
              >
                จอง
              </Button>
            ) : (
              <Button {...disabledBtnProps}>จอง</Button>
            )}
          </Col>
        </Col>

        {/* right side */}
        <Col span={12}>
          <Row>
            <Badge style={badgeStyles}>ข้อมูลสถานที่</Badge>
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
            <Badge style={badgeStyles}>ข้อมูลการจอง</Badge>
            <QuickTask data={quickTask} />
          </Row>
        </Col>
      </Row>
    </StaffLayout>
  );
};

export default AreaPage;
