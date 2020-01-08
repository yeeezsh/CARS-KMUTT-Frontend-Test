import React, { Component } from 'react'
import { Row, Col } from 'antd'
import moment, { Moment } from 'moment'
import TimeNode from './timetable.interface'

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

interface TimeTableState {
    table: TimeNode[]
}

interface TimeTableProps {
    start: Moment
    stop: Moment
    interval: number,
    disabled?: TimeNode[]
    onSelect: any
}

const cardStyle = (type: TimeNode['type'])
    : React.CSSProperties => {
    switch (type) {
        case 'disabled':
            return disabled
        case 'selecting':
            return selecting
        default:
            return {}
    }

}


export default class TimeTable extends Component<
    TimeTableProps,
    TimeTableState
    > {

    constructor(props: TimeTableProps) {
        super(props)
        this.state = {
            table: []
        }
    }

    onSelect = (
        date: Moment,
        type: TimeNode['type']
    ): {
        date: Moment,
        type: TimeNode['type']
    } => {
        return this.props.onSelect({
            date: date,
            type: type
        })

    }

    componentDidMount = () => {
        const { start, stop, interval, disabled } = this.props
        let table: TimeNode[] = []
        let cur = moment(start)

        while (cur < stop) {
            table.push({
                value: cur,
                type: 'available'
            })
            cur = moment(cur.add(interval, 'minute'))
        }

        const disabledMapped = disabled?.map(e => e.value.format('hh.mm'))
        table = table.map(e => {
            const type = disabledMapped
                ?.includes(e.value.format('hh.mm'))
            if (type) {
                return {
                    ...e,
                    type: 'disabled'
                }
            }
            return e
        })

        return this.setState({
            table
        })
    }

    render() {
        const { table } = this.state
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
                        table[0] && table.map(({ value, type }, i) => (
                            <Row
                                key={i}
                                onClick={() => this.onSelect(value, type)}
                                type='flex'
                                justify='center'>
                                <p
                                    style={cardStyle(type)}
                                    className={styles.card}
                                >{value.format('hh.mm')}
                                </p>
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
