import React from 'react';
import Loadable from 'react-loadable';
import AreaBuildingEnum from 'Services/area/@enums/area.building.enum';
import { AreaServiceResponseAPI } from 'Services/area/@interfaces/area.interfaces';
import AreaBuildingType from 'Services/area/@types/area.building.type';
import AreaPageCommonMeetingClub from './AreaPageCommonMeetingClub';

const AreaPageCommonMeetingTask = Loadable({
  loading: () => null,
  loader: () => import('./AreaPageCommonMeeting'),
});
const AreaPageSportTask = Loadable({
  loading: () => null,
  loader: () => import('./AreaPageSport'),
});
const AreaPageCommonTask = Loadable({
  loading: () => null,
  loader: () => import('./AreaPageCommon'),
});

export type AreaPageFactoryType = AreaBuildingType;

// eslint-disable-next-line react/display-name
export default (
  type: AreaPageFactoryType,
  area: AreaServiceResponseAPI,
): JSX.Element => {
  switch (type) {
    case AreaBuildingEnum.sport:
      return <AreaPageSportTask areaInfo={area} />;
    case AreaBuildingEnum.meeting:
      return <AreaPageCommonMeetingTask areaInfo={area} />;
    case AreaBuildingEnum.meetingClub:
      return <AreaPageCommonMeetingClub areaInfo={area} />;
    case AreaBuildingEnum.common:
      return <AreaPageCommonTask areaInfo={area} />;
    case AreaBuildingEnum.commonSport:
      return <AreaPageCommonTask areaInfo={area} />;
    default:
      return <div>type not supported</div>;
  }
};
