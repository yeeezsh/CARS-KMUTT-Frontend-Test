import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Moment } from 'moment'

import styles from './styles.module.css'

import Outline from '../Outline'
import BreakingLine from '../BreakingLine'

const selecting: React.CSSProperties = {
    backgroundColor: '#1890FF',
    color: '#FFFFFF',
    border: '1px solid #1890FF',
}

const disabled: React.CSSProperties = {
    backgroundColor: '#DADADA',
    color: '#979797',
    border: ' 1px solid #979797',
}

interface TimeNode {
    value: Moment
}


export default class TimeTable extends Component<
    {},
    {

    },
    {
        table: []
    }
    > {
    state = {
        table: [],
        // disabled: [],
        // selecting: []
    }
    componentWillReceiveProps = () => {
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
                        <p
                            // style={selecting}
                            className={styles.card}
                        >08.00</p>
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
