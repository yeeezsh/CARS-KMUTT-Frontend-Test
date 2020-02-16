import React from 'react';
import { TaskTableType } from 'Models/taskTable/interface';
import { Row, Col } from 'antd';
import ListTable from './list';

interface Props {
  title?: string;
  icon?: string;
  data?: TaskTableType;
}

const TaskTable: React.FC<Props> = props => {
  const { data, icon, title } = props;
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
        </Col>
      </Row>

      <Row></Row>
      <Row>
        {data &&
          data.map((e, i) => <ListTable key={e._id} header={i !== 0} />)}
      </Row>
    </div>
  );
};

export default TaskTable;
