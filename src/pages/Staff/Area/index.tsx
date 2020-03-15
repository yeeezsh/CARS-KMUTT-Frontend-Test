import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import StaffLayout from 'Components/Layout/Staff/Home';
import { useLocation } from 'react-router';
import TimeTable from 'Components/TimeTable';
import moment, { Moment } from 'moment';
import TimeNode from 'Components/TimeTable/timetable.interface';
import AreaInfo from './info';
import { areaAPI } from 'Models/area';
import { AreaAvailableAPI } from 'Models/area/area.interface';
import { AreaAPI } from 'Models/area/interfaces';

const AreaPage: React.FC = () => {
  const { pathname } = useLocation();
  const areaId = pathname.split('/')[3];

  const initSelecting: TimeNode[][] = [[]];
  const [selecting, setSelecting] = useState(initSelecting);
  const initAvailArea: AreaAvailableAPI[] = [];
  const [availArea, setAvailArea] = useState(initAvailArea);
  const initAreaInfo: AreaAPI = {
    _id: '',
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

  // function onTimeSelecting(
  //   value: Moment,
  //   type: TimeNode['type'],
  //   i: number,
  // ) {
  //   console.log('node secled', value, type);
  //   const selectingDay = selecting[i];
  //   const duplicated = selectingDay.find(
  //     f =>
  //       moment(f.value).format('HH:mm') === moment(value).format('HH:mm'),
  //   );
  //   console.log('dup', duplicated);
  //   if (type === 'available') {
  //     // const cur = selectingDay.push({ value, type: 'selecting' });
  //     const cur: TimeNode[] = [
  //       ...selectingDay,
  //       { value, type: 'selecting' },
  //     ];
  //     return setSelecting(prev =>
  //       prev.map((e, ix) => (ix === i ? cur : e)),
  //     );
  //     // return setSelecting([]);
  //     // return setSelecting(prev => [...prev, { value }]);
  //   }

  //   if (type === 'selecting') {
  //     return setSelecting(prev =>
  //       prev.filter(
  //         f =>
  //           moment(f.value).format('HH:mm') !==
  //           moment(value).format('HH:mm'),
  //       ),
  //     );
  //   }
  // }

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
        <Col span={16}>
          {/* time table area */}
          {availArea.map((e, i) => {
            return (
              <TimeTable
                // HOT FIX sub stract by 1 day
                selected={selecting[i]}
                title={e.date.format('DD-MM-YYYY')}
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
        <Col span={8}>
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
        </Col>
      </Row>
    </StaffLayout>
  );
};

export default AreaPage;
