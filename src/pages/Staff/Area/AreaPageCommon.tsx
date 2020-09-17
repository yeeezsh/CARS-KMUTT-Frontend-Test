import { Col, Row } from 'antd';
import StaffLayout from 'Components/Layout/Staff/Home';
import Loading from 'Components/Loading';
import {
  Activity as CommonActivity,
  Sport as CommonSportActivity,
} from 'Pages/Areas/Common';
import AreaCommonCategoryTypesPage from 'Pages/Areas/Common/AreaCommonCategoryTypes';
import React from 'react';
import { useLocation } from 'react-router';
import AreaPagePropsType from './@types/area.page.props.type';
import AreaInfo from './AreaInfo';
import cardStyle from './common/card.style';
import useCommonAreaTaskCategory from './hooks/useCommonAreaTaskCategory';

const AreaPageCommon: React.FC<AreaPagePropsType> = props => {
  const { areaInfo } = props;

  const { pathname } = useLocation();

  const [
    selectAreaTaskType,
    setSelectAreaTaskType,
    allowSport,
  ] = useCommonAreaTaskCategory(pathname, props.areaInfo);
  const ColStyle: React.CSSProperties = { minHeight: '500px' };
  console.log('select a', selectAreaTaskType);
  return (
    <StaffLayout>
      <Row>
        {/* Left side */}
        <Col style={{ ...cardStyle, ...ColStyle }} span={10}>
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
        </Col>

        {/* right side */}
        <Col style={{ ...cardStyle, ...ColStyle }} span={13}>
          {!selectAreaTaskType && (
            <AreaCommonCategoryTypesPage
              useRouter={false}
              selected={setSelectAreaTaskType}
              allowSport={allowSport}
            />
          )}
          {selectAreaTaskType === 'activity' && <CommonActivity />}
          {selectAreaTaskType === 'sport' && <CommonSportActivity />}
        </Col>
      </Row>
    </StaffLayout>
  );
};

export default AreaPageCommon;
