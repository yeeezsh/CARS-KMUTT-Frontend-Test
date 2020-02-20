import React, { useState, useEffect } from 'react';
import { TaskTableType } from 'Models/taskTable/interface';
import { Row, Col } from 'antd';
import ListTable from './list';
import SortByTools from 'Components/SortByTools';
import sortHelper from './sort.helper';

interface Props {
  title?: string;
  icon?: string;
  data?: TaskTableType;
}

const TaskTable: React.FC<Props> = props => {
  const { data, icon, title } = props;
  const [sortSelect, setSortSelect] = useState(undefined);
  console.log('task table', data);

  return (
    <div>
      <Row>
        {/* title */}
        <Col span={6}>
          <Row type="flex">
            <img src={icon} alt="head icon" />
            <p
              style={{
                marginLeft: '6px',
                marginTop: '14px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#FF682B',
              }}
            >
              {title}
            </p>
          </Row>
        </Col>

        {/* tools */}
        <Col offset={10} span={8} style={{ textAlign: 'right' }}>
          Sort ja
          <SortByTools onSelected={e => setSortSelect(e)} />
        </Col>
      </Row>

      {/* <Row></Row> */}
      {/* data display */}
      <Row>
        <ListTable header={true} />
        {data &&
          data
            .sort(sortHelper(sortSelect))
            .map(e => <ListTable header={false} key={e._id} data={e} />)}
      </Row>
    </div>
  );
};

export default TaskTable;
