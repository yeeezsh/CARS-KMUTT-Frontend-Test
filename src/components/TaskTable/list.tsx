import React from 'react';
import { Row, Col } from 'antd';
import { data } from 'Models/reserve/data';
import { TaskTable } from 'Models/taskTable/interface';

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
  };

  // return header col
  if (!header)
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
        <Col>วันที่</Col>
        <Col>รหัสการจอง</Col>
        <Col>ประเภทการจอง</Col>
        <Col>สถานที่</Col>
        <Col>รหัสผู้จอง</Col>
        <Col>สถานะ</Col>
      </Row>
    );

  // return data col
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
      <Col>{data?.createAt}</Col>
      <Col>{data?._id}</Col>
      <Col>{data?.type}</Col>
      <Col>{data?.area.label || data?.area.name}</Col>
      <Col>{data?.requestor[0].username}</Col>
      <Col>{data?.state}</Col>
    </Row>
  );
};

export default ListTable;
