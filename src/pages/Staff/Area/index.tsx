import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
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
  const initAreaInfo: AreaAPI = {
    _id: undefined,
    name: '',
    forward: 0,
    reserve: [],
  };
  const [areaInfo, setAreaInfo] = useState(initAreaInfo);

  useEffect(() => {
    areaAPI.getAreaInfo(areaId).then(a => setAreaInfo(a));
    areaAPI.getAreaAvailable(areaId).then(a => {
      setAvailArea(a);
      setSelecting(Array(a.length).fill([]));
    });
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
      return setSelecting(prev => prev.map((e, ix) => (ix === i ? d : e)));
    }
    if (type === 'selecting') {
      const d: TimeNode[] = selectingDay.filter(
        f => moment(f.value).format('HH:mm') !== value.format('HH:mm'),
      );
      return setSelecting(prev => prev.map((e, ix) => (ix === i ? d : e)));
    }
    console.log('dayy', selectingDay);
    console.log('daye', value.format('DD-MM-YYYY HH:mm'));
  }

  console.log('avail list', availArea);
  console.log('selectung', selecting);
  return (
    <StaffLayout>
      {areaId}

      <Row gutter={16}>
        <Col span={14}>
          {/* time table area */}
          {availArea.map((e, i) => {
            return (
              <TimeTable
                // HOT FIX sub stract by 1 day
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
          {/* <TimeTable
            selected={selecting}
            start={moment()}
            stop={moment().add(6, 'hour')}
            interval={60}
            // onSelect={(value, type) => console.log(value, type)}
            onSelect={onTimeSelecting}
          /> */}
        </Col>
        <Col span={10}>
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
            {areaInfo._id && (
              <QuickTask
                areaId={areaInfo && areaInfo._id}
                start={moment().startOf('day')}
                stop={moment()
                  .startOf('day')
                  .add(areaInfo.forward, 'day')}
              />
            )}
          </Row>
        </Col>
      </Row>
    </StaffLayout>
  );
};

export default AreaPage;
