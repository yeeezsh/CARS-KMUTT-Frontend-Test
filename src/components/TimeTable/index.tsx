import React, { Component } from 'react'
import { Row, Col } from 'antd'

import Outline from '../Outline'
import BreakingLine from '../BreakingLine'

export default class TimeTable extends Component {
    state = {
        table: [],
        disabled: [],
        selecting: []
    }
    render() {
        return (
            <React.Fragment>
                {/* outliner */}
                <Outline>
                    <span style={{ fontSize: '14px' }}>
                        สนามฟุตบอล
                    </span>
                </Outline>

                {/* timetable */}
                <Row type='flex' justify='space-around'>
                    <Col span={6}>
                        <p>1</p>
                    </Col>
                </Row>

                {/* borderline */}
                <Col span={24}>
                    <BreakingLine lineSize={.5} />
                </Col>
            </React.Fragment>
        )
    }
}
