import { Col, Row } from 'antd';
import Loading from 'Components/Loading';
import {
  Activity as CommonActivity,
  Sport as CommonSportActivity,
} from 'Pages/Areas/Common';
import React from 'react';
import Loadable from 'react-loadable';
import { useLocation } from 'react-router';
import AreaPagePropsType from './@types/area.page.props.type';
import cardStyle from './common/card.style';
import useCommonAreaTaskCategory from './hooks/useCommonAreaTaskCategory';

const AreaInfo = Loadable({
  loading: () => null,
  loader: () => import('./AreaInfo'),
});
const StaffLayout = Loadable({
  loading: () => null,
  loader: () => import('Components/Layout/Staff/Home'),
});
const AreaCommonCategoryTypesPage = Loadable({
  loading: () => null,
  loader: () => import('Pages/Areas/Common/AreaCommonCategoryTypes'),
});

const AreaPageCommon: React.FC<AreaPagePropsType> = props => {
  const { areaInfo } = props;

  const { pathname } = useLocation();

  const [
    selectAreaTaskType,
    setSelectAreaTaskType,
    allowSport,
    onReset,
  ] = useCommonAreaTaskCategory(pathname, props.areaInfo);
  const ColStyle: React.CSSProperties = { minHeight: '500px' };

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
          {selectAreaTaskType === 'activity' && (
            <CommonActivity useModal={false} onSend={onReset} />
          )}
          {selectAreaTaskType === 'sport' && (
            <CommonSportActivity useModal={false} onSend={onReset} />
          )}
        </Col>
      </Row>
    </StaffLayout>
  );
};

export default AreaPageCommon;
