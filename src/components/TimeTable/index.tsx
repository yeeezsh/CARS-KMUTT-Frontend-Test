import React, { Component } from 'react'
import { Row, Col } from 'antd'
import moment, { Moment } from 'moment'

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
    value: Moment,
    type: 'selecting' | 'disabled' | 'available'
}


export default class TimeTable extends Component<
    {
        start: Moment,
        stop: Moment,
        interval: number,
    },
    {
        table: any
    }
    > {
    state = {
        table: [],
        // disabled: [],
        // selecting: []
    }

    render() {
        const { start, stop, interval } = this.props
        const table: TimeNode[] = []
        let cur = moment(start)

        while (cur < stop) {
            table.push({
                value: cur,
                type: 'available'
            })
            cur = moment(cur.add(interval, 'minute'))
        }

        console.log(table)

        return (
            <React.Fragment>
                {/* outliner */}
                <Outline>
                    <span style={{ fontSize: '14px' }}>
                        สนามฟุตบอล
                    </span>
                </Outline>

                {/* timetable */}
                <Row type='flex' justify='start'>
                    {
                        table && table.map(({ value, type }) => (
                            <Row type='flex' justify='center'>
                                {/* <Col span={6}> */}
                                <p
                                    // style={selecting}
                                    className={styles.card}
                                >{value.format('hh.mm')}</p>
                                {/* </Col> */}
                            </Row>
                        ))
                    }
                </Row>

                {/* borderline */}
                <Col span={24}>
                    <BreakingLine lineSize={.5} />
                </Col>
            </React.Fragment>
        )
    }
}
