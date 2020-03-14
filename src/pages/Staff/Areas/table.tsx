import React from 'react';
import { Table as TableAnt } from 'antd';
import { AreaTableAPI } from 'Models/area/interfaces';
import { ColumnProps } from 'antd/lib/table';

const AreaTable: React.FC<{ data: AreaTableAPI[] }> = props => {
  const columns: ColumnProps<AreaTableAPI>[] = [
    {
      title: 'สนาม / ห้อง',
      key: 'label',
      dataIndex: 'label',
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
      pagination={false}
      onRowClick={e => console.log(e._id)}
      columns={columns}
      dataSource={props.data}
    />
  );
};

export default AreaTable;
