import { Badge } from 'antd';
import React from 'react';
import { TaskTable, TaskTableTypeAPI } from 'Services/taskTable/interface';

const ListElement: React.FC<{ task?: TaskTable }> = props => (
  <div style={{ margin: 0, padding: 0 }}>
    AAAAAAAAAAAAAAAAAAAAA
    <Badge count={'กีฬา'} style={{ backgroundColor: '#52c41a' }} />
  </div>
);

const AutoComplete: React.FC<{ data: TaskTableTypeAPI }> = props => {
  const data = props.data.data;
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'red',
        margin: 0,
        padding: 0,
      }}
    >
      <ListElement task={data[0]} />
      <ListElement task={data[0]} />
      <ListElement task={data[0]} />
    </div>
  );
};

export default AutoComplete;
