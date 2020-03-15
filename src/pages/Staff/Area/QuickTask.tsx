/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Moment } from 'moment';
import { ColumnProps } from 'antd/lib/table';
import State from 'Components/TaskTable/state';
import { taskAPI } from 'Models/task';
import { QuickTask } from 'Models/task/task.quick.interface';
import { Link } from 'react-router-dom';

const QuickTask: React.FC<{
  areaId?: string;
  start: Moment;
  stop: Moment;
}> = props => {
  const [loading, setLoading] = useState(true);
  const initData: QuickTask[] = [];
  const [data, setData] = useState(initData);

  //   fetching qt data
  useEffect(() => {
    const { areaId, start, stop } = props;

    console.log('quick task,', areaId, start, stop);
    areaId &&
      taskAPI
        .getQuickTask(areaId, start, stop)
        .then(d => {
          console.log('quick task data', d);
          setLoading(false);
          setData(d);
        })
        .catch(err => console.error(err));
  }, []);

  const columns: ColumnProps<QuickTask>[] = [
    {
      title: 'รหัสการจอง',
      dataIndex: '_id',
      render: data => (
        <Link style={{ color: '#1890FF' }} to={'/staff/task/' + data}>
          {String(data).slice(0, 3) + '.' + String(data).slice(-4)}
        </Link>
      ),
    },
    {
      title: 'ผู้จอง',
      dataIndex: 'username',
    },
    {
      title: 'วันจอง',
      dataIndex: 'date',
      render: d => (
        <div>
          <p>{d.format('DD-MM-YYYY')}</p>
          <p>{d.format('HH:mm')}</p>
        </div>
      ),
    },
    {
      title: 'สถานะ',
      dataIndex: 'state',
      //   render: data => <State state={data?.state} />,
      render: data => <State state={data} />,
    },
  ];
  return (
    <Table
      pagination={false}
      loading={loading}
      columns={columns}
      dataSource={data}
    />
  );
};

export default QuickTask;
