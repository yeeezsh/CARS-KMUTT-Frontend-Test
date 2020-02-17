import React from 'react';
import { Row, Col } from 'antd';

import { TaskTable } from 'Models/taskTable/interface';
import moment from 'moment';
import State from './state';
import typeDescHelper from './type.desc.helper';

const ListTable: React.FC<{
  header?: boolean;
  data?: TaskTable;
}> = props => {
  const { data, header } = props;
  const mainStyle: React.CSSProperties = {
    background: '#FFFFFF',
    height: '45px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    borderRadius: '2px',
    padding: '12px',
    textAlign: 'center',
  };

  // return header col
  if (header)
    return (
      <Row
        type="flex"
        justify="space-around"
        style={{
          ...mainStyle,
          ...{
            background: '#FF682B',
            color: '#FFFFFF',
            fontWeight: 'bold',
            marginBottom: '10px',
          },
        }}
      >
        <Col span={4}>วันที่</Col>
        <Col span={4}>รหัสการจอง</Col>
        <Col span={3}>ประเภทการจอง</Col>
        <Col span={6}>สถานที่</Col>
        <Col span={5}>รหัสผู้จอง</Col>
        <Col span={2}>สถานะ</Col>
      </Row>
    );

  // return data col
  console.log(data);
  return (
    <Row
      type="flex"
      justify="space-around"
      style={{
        ...mainStyle,
        ...{
          background: '#FFFFFF',
          color: '#979797',
          marginBottom: '6px',
        },
      }}
    >
      <Col span={4}>{moment(data?.createAt).format('DD-MM-YYYY')}</Col>
      <Col span={4}>
        {String(data?._id).slice(0, 3) + '.' + String(data?._id).slice(-4)}
      </Col>
      <Col span={3}>{typeDescHelper(data?.type)}</Col>
      <Col span={6}>{data?.area.label || data?.area.name}</Col>
      <Col span={5}>{data?.requestor[0].username}</Col>
      <Col span={2}>{<State state={data?.state.slice(-1)[0]} />}</Col>
    </Row>
  );
};

export default ListTable;
