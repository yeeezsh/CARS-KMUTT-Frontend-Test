import { Col, Row } from 'antd';
import StaffLayout from 'Components/Layout/Staff/Home';
import Loading from 'Components/Loading';
import { FormClub } from 'Pages/Areas/Common/Meeting';
import React, { useEffect } from 'react';
import Loadable from 'react-loadable';
import AreaPagePropsType from './@types/area.page.props.type';
import cardStyle from './common/card.style';
import useFetchAvailableAndQuickTask from './hooks/useFetchAvailableAndQuickTask';
import useMeetingClubTask from './hooks/useMeetingClubTask';
import useOnSelectingTimeTable from './hooks/useOnSelectingTimeTable';

const AreaQuickTask = Loadable({
  loading: () => null,
  loader: () => import('./AreaQuickTask'),
});
const AreaInfo = Loadable({
  loading: () => null,
  loader: () => import('./AreaInfo'),
});

const AreaPageCommonMeetingClub: React.FC<AreaPagePropsType> = props => {
  const { areaInfo } = props;

  const [
    ,
    setSelecting,
    selectedDate,
    setSelectedDate,
    ,
  ] = useOnSelectingTimeTable();

  const [quickTask, , loading, fetch] = useFetchAvailableAndQuickTask(
    areaInfo,
    setSelecting,
    true,
  );

  // fetch when dateChange
  useEffect(() => {
    selectedDate && fetch(selectedDate.start, selectedDate.stop);
  }, [selectedDate]);

  const [onReset] = useMeetingClubTask(selectedDate, fetch);

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
          <FormClub
            areaInfo={areaInfo}
            createByStaff={true}
            selectDate={e =>
              setSelectedDate({
                start: e,
                stop: e,
              })
            }
            onSubmit={onReset}
          />
        </Col>
      </Row>
    </StaffLayout>
  );
};

export default AreaPageCommonMeetingClub;
