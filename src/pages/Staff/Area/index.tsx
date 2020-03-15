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

  const initSelecting: TimeNode[] = [
    { value: moment().add(1, 'hour'), type: 'selecting' },
    { value: moment().add(2, 'hour'), type: 'selecting' },
  ];
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
    areaAPI.getAreaAvailable(areaId).then(a => setAvailArea(a));
  }, []);

  function onTimeSelecting(value: Moment, type: TimeNode['type']) {
    console.log('node secled', value, type);
    const duplicated = selecting.find(
      f =>
        moment(f.value).format('HH:mm') === moment(value).format('HH:mm'),
    );
    console.log('dup', duplicated);
    if (type === 'available') {
      return setSelecting(prev => [...prev, { value, type: 'selecting' }]);
      // return setSelecting([]);
      // return setSelecting(prev => [...prev, { value }]);
    }

    if (type === 'selecting') {
      return setSelecting(prev =>
        prev.filter(
          f =>
            moment(f.value).format('HH:mm') !==
            moment(value).format('HH:mm'),
        ),
      );
    }
  }

  console.log('yahhhhhh', selecting, availArea, areaInfo);
  return (
    <StaffLayout>
      {areaId}

      <Row>
        <Col span={16}>
          {/* time table area */}
          <TimeTable
            selected={selecting}
            start={moment()}
            stop={moment().add(6, 'hour')}
            interval={60}
            // onSelect={(value, type) => console.log(value, type)}
            onSelect={onTimeSelecting}
          />
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
