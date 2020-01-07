import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Outline from '../Outline'

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
                    <Row type='flex' justify='center'>
                        <Col span={22}>
                            <div style={{
                                border: '.5px solid #DADADA',
                                marginTop: '-4px'
                            }} />
                        </Col>
                    </Row>
                </Col>
            </React.Fragment>
        )
    }
}
