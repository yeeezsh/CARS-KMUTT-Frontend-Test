/* eslint-disable react/display-name */
import { Table as TableAnt } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import { useHistory } from 'react-router';
import { AreaTableAPI } from 'Services/area/interfaces';

const AreaTable: React.FC<{
  data: AreaTableAPI[];
  loading?: boolean;
}> = props => {
  const history = useHistory();
  const columns: ColumnProps<AreaTableAPI>[] = [
    {
      title: 'สนาม / ห้อง',
      key: 'label',
      dataIndex: 'label',
      render: d => <a style={{ color: '#1890ff' }}>{d}</a>,
      sorter: (a, b) => a.label.localeCompare(b.label),
    },
    {
      title: 'สถานที่',
      render: (d: AreaTableAPI) => d.building.label.split(',')[1],
      key: 'building',
      sorter: (a, b) => a.building.label.localeCompare(b.building.label),
    },
  ];
  return (
    <TableAnt
      bodyStyle={{
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
      }}
      loading={props.loading || false}
      pagination={false}
      onRowClick={r => history.push('/staff/area/' + r._id)}
      columns={columns}
      dataSource={props.data}
    />
  );
};

export default AreaTable;
