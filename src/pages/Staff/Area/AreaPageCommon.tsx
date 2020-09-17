import StaffLayout from 'Components/Layout/Staff/Home';
import React from 'react';
import AreaPagePropsType from './@types/area.page.props.type';

const AreaPageCommon: React.FC<AreaPagePropsType> = props => {
  return <StaffLayout>common or commonSport</StaffLayout>;
};

export default AreaPageCommon;
