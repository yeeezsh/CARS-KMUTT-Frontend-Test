import React, { useState, useEffect } from 'react';
import { TaskTableType, TaskTable } from 'Models/taskTable/interface';
import { Row, Col, Table } from 'antd';
import ListTable from './list';
import SortByTools from 'Components/SortByTools';
import sortHelper from './sort.helper';
import HeadTitle from 'Components/HeadTitle';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import typeDescHelper from './type.desc.helper';
import State from './state';
import ActionBtn from './ActionBtn';
import { useHistory } from 'react-router';

interface Props {
  title?: string;
  icon?: string;
  data?: TaskTableType;
}

const TaskTable: React.FC<Props> = props => {
  const { data, icon, title } = props;
  const [sortSelect, setSortSelect] = useState(undefined);
  const history = useHistory();

  const TASK_LINK = (id: string): string => `/staff/task/${id}`;
  const tableCols: ColumnProps<TaskTable>[] = [
    {
      title: 'วันที่',
      key: 'createAt',
      width: 110,
      render: data => moment(data?.createAt).format('DD-MM-YYYY'),
    },
    {
      title: 'รหัสการจอง',
      key: '_id',
      render: data =>
        String(data?._id).slice(0, 3) + '.' + String(data?._id).slice(-4),
    },
    {
      title: 'ประเภทการจอง',
      key: 'reservationType',
      render: data => typeDescHelper(data?.type),
    },
    {
      title: 'สถานที่',
      key: 'area',
      width: 280,
      render: data => data?.area.label || data?.area.name,
    },
    {
      title: 'รหัสผู้จอง',
      key: 'requestor',
      render: data => data?.requestor[0] && data?.requestor[0].username,
    },
    {
      title: 'สถานะ',
      key: 'status',
      width: 90,
      // eslint-disable-next-line react/display-name
      render: data => <State state={data?.state.slice(-1)[0]} />,
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      // eslint-disable-next-line react/display-name
      render: data => (
        <ActionBtn onClick={() => history.push(TASK_LINK(data._id))} />
      ),
    },
  ];

  console.log('task table', data);

  return (
    <div>
      <Row>
        {/* title */}
        <HeadTitle icon={icon} title={title} />

        {/* tools */}
        <Col offset={10} span={8} style={{ textAlign: 'right' }}>
          <SortByTools onSelected={e => setSortSelect(e)} />
        </Col>
      </Row>

      {/* <Row></Row> */}
      {/* data display */}
      <Table dataSource={data} columns={tableCols} />

      {/* <Row>
        <ListTable header={true} />
        {data &&
          data
            // .sort(sortHelper(sortSelect))
            .map(e => <ListTable header={false} key={e._id} data={e} />)}
      </Row> */}
    </div>
  );
};

export default TaskTable;
