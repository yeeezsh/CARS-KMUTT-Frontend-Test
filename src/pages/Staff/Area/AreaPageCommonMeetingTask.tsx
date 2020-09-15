import { Col, Row } from 'antd';
import Button from 'Components/Button';
import StaffLayout from 'Components/Layout/Staff/Home';
import Loading from 'Components/Loading';
import TimeRangeSelect from 'Components/TimeRangeSelect/TimeRangeSelect';
import TimeTable from 'Components/TimeTable';
import confirmButton from 'Models/button/confirm.button';
import disabledButton from 'Models/button/disabled.button';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import AreaBuildingEnum from 'Services/area/@enums/area.building.enum';
import { AreaAPI } from 'Services/area/interfaces';
import { u } from 'Services/user';
import AreaInfo from './AreaInfo';
import cardStyle from './common/card.style';
import useFetchAvailableAndQuickTask from './hooks/useFetchAvailableAndQuickTask';
import useOnRserveTimeTableAPI from './hooks/useOnReserveTimeTableAPI';
import useOnSelectingTimeTable from './hooks/useOnSelectingTimeTable';

const AreaQuickTask = Loadable({
  loading: () => null,
  loader: () => import('./AreaQuickTask'),
});

const AreaPageCommonMeetingTask: React.FC<{
  areaInfo: AreaAPI;
}> = props => {
  const { areaInfo } = props;
  const today = moment().startOf('day');
  const [canReserve, setCanReserve] = useState(false);

  const [
    selecting,
    setSelecting,
    selectedDate,
    setSelectedDate,
    onSelect,
  ] = useOnSelectingTimeTable();

  const [
    quickTask,
    availArea,
    loading,
    fetch,
  ] = useFetchAvailableAndQuickTask(areaInfo, setSelecting);

  // fetch when dateChange
  useEffect(() => {
    selectedDate && fetch(selectedDate.start, selectedDate.stop);
  }, [selectedDate]);

  // area info
  useEffect(() => {
    setSelectedDate({
      start: moment(today),
      stop: moment(today).add(areaInfo?.forward, 'day'),
    });
  }, [areaInfo]);

  function onCancel() {
    setSelecting(prev => prev.map(() => []));
  }
  const [onReserve] = useOnRserveTimeTableAPI(
    u,
    areaInfo,
    onCancel,
    fetch,
    AreaBuildingEnum.meeting,
  );

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
        <Col style={cardStyle} span={13}>
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

          <AreaQuickTask data={quickTask} loading={loading} />
        </Col>

        {/* right side */}
        <Col style={cardStyle} span={10}>
          {areaInfo ? (
            <TimeRangeSelect
              now={today}
              forward={areaInfo.forward}
              onSelect={(start, stop) => setSelectedDate({ start, stop })}
            />
          ) : (
            <Loading />
          )}
          {/* time table area */}
          {areaInfo && areaInfo.reserve[0] ? (
            availArea &&
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
                    onClick={() =>
                      selectedDate && onReserve(selectedDate, selecting)
                    }
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

export default AreaPageCommonMeetingTask;
