import { Badge, Row, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import HeadTitle from 'Components/HeadTitle';
import taskTypeConstant from 'Models/task-type.constant';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';
import { TaskType } from 'Services/task/task.interface';
import { TaskTable, TaskTableType } from 'Services/taskTable/interface';
import ActionBtn from './ActionBtn';
import State from './state';

interface Props {
  title?: string;
  icon?: string;
  data?: TaskTableType;
  allDataCount: number;
  loading?: boolean;
  current?: number;
  dataRequest?: (
    pagination: {
      current: number;
      pageSize: number;
    },
    order: { column: string; order: 1 | -1 },
  ) => void;
}

const BadgeTaskType: React.FC<{ type?: TaskType }> = props => {
  const badge = props.type && taskTypeConstant(props.type);
  return (
    <Badge
      count={badge?.label}
      style={{
        fontSize: '14px',
        fontWeight: 'bold',
        backgroundColor: 'white',
        color: badge?.color,
        border: `1px solid ${badge?.color}`,
      }}
    />
  );
};

const TaskTable: React.FC<Props> = props => {
  const { data, icon, title, allDataCount, current } = props;
  const history = useHistory();
  const TASK_LINK = (id: string): string => `/staff/task/${id}`;

  const tableCols: ColumnProps<TaskTable>[] = [
    {
      title: 'วันที่',
      key: 'createAt',
      width: 110,
      sorter: (a, b) =>
        moment(a.createAt).valueOf() - moment(b.createAt).valueOf(),
      render: d => moment(d?.createAt).format('DD-MM-YYYY'),
    },
    {
      title: 'รหัสการจอง',
      key: '_id',
      render: d => d.vid,
    },
    {
      title: 'ประเภทการจอง',
      key: 'reservationType',
      // render: data => typeDescHelper(data?.type),
      // eslint-disable-next-line react/display-name
      render: (d: TaskTable) => <BadgeTaskType type={d.type} />,
    },
    {
      title: 'สถานที่',
      key: 'area',
      width: 280,
      render: d => d?.area?.label || d?.area?.name,
    },
    {
      title: 'รหัสผู้จอง',
      key: 'requestor',
      render: d => d?.requestor[0] && d?.requestor[0].username,
    },
    {
      title: 'สถานะ',
      key: 'state',
      width: 90,
      sorter: (a, b) =>
        a.state.slice(-1)[0].localeCompare(b.state.slice(-1)[0]),
      // eslint-disable-next-line react/display-name
      render: d => <State state={d?.state.slice(-1)[0]} />,
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      // eslint-disable-next-line react/display-name
      render: d => (
        <ActionBtn onClick={() => history.push(TASK_LINK(d._id))} />
      ),
    },
  ];

  console.log('task table', data);

  return (
    <div>
      <Row>
        {/* title */}
        <HeadTitle icon={icon} title={title} />
      </Row>

      {/* data display */}
      <Table
        style={{ minHeight: 500 }}
        loading={props.loading || false}
        pagination={{ total: allDataCount, current }}
        onChange={(pagination, filters, sorter) => {
          const { dataRequest } = props;
          dataRequest &&
            dataRequest(
              {
                current: pagination.current || -1,
                pageSize: pagination.pageSize || -1,
              },
              {
                column: sorter.columnKey,
                order: sorter.order === 'ascend' ? 1 : -1,
              },
            );
        }}
        dataSource={data}
        columns={tableCols}
      />
    </div>
  );
};

export default TaskTable;
