/* eslint-disable react/display-name */
import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import State from 'Components/TaskTable/state';

import { QuickTask } from 'Models/task/task.quick.interface';
import { Link } from 'react-router-dom';

const QuickTask: React.FC<{
  data: QuickTask[];
}> = props => {
  const columns: ColumnProps<QuickTask>[] = [
    {
      title: 'รหัสการจอง',
      width: '25%',
      dataIndex: '_id',
      render: data => (
        <Link style={{ color: '#1890FF' }} to={'/staff/task/' + data}>
          {String(data).slice(0, 3) + '.' + String(data).slice(-4)}
        </Link>
      ),
    },
    {
      title: 'ผู้จอง',
      width: '25%',
      dataIndex: 'username',
    },
    {
      title: 'วันจอง',
      dataIndex: 'date',
      width: '35%',
      render: d => (
        <div>
          <p>{d.format('DD-MM-YYYY')}</p>
          <p>{d.format('HH:mm')}</p>
        </div>
      ),
    },
    {
      title: 'สถานะ',
      width: '15%',
      dataIndex: 'state',
      //   render: data => <State state={data?.state} />,
      render: data => <State state={data} />,
    },
  ];
  return (
    <Table
      pagination={false}
      //   loading={loading}
      columns={columns}
      dataSource={props.data}
    />
  );
};

export default QuickTask;
