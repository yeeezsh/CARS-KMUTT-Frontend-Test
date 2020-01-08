import React, { Component } from 'react'
import { Row, Col } from 'antd'
import moment, { Moment } from 'moment'

import orangeSquareIcon from '../../assets/icons/square/orange.svg'
import greySquareIcon from '../../assets/icons/square/grey.svg'
import blueSquareIcon from '../../assets/icons/square/blue.svg'

import TimeTable from '../../components/TimeTable'
import Outline from '../../components/Outline'
import PageLayout from '../../components/Layout/Page'
import Badge from '../../components/Badge'
import BadgeDateSelector from '../../components/BadgeDateSelector'
import StateSteps from '../../components/StateSteps'
import StepsType from '../../components/StateSteps/step.interface'
import BreakingLine from '../../components/BreakingLine'

import TimeNode from '../../components/TimeTable/timetable.interface'

export default class SportPage extends Component<
    {},
    { dateSelect: Moment }
    > {

    state = {
        dateSelect: moment().startOf('day')
    }

    onSelectDate = (date: Moment) => {
        console.log('select date', date.format('DD'))
        return this.setState({
            dateSelect: date
        })
    }

    onSelectTime = (date: TimeNode) => {
        console.log(date)
    }
    render() {
        const { dateSelect } = this.state
        return (
            <React.Fragment>
                <PageLayout titile={'จองสนามกีฬา'}>

                    <div style={{ height: '25px' }} />

                    {/* steps */}
                    <Col offset={2} span={20}>
                        < Row type='flex' justify='center'>
                            <Col span={22}>
                                <StateSteps
                                    current={0}
                                    steps={stepLists}
                                />
                            </Col>
                        </Row>
                    </Col>

                    {/* spacing */}
                    <div style={
                        { height: '25px' }
                    } />

                    {/* Badge */}
                    <Col span={24}>
                        <Row type='flex' justify='start'>
                            <Badge>
                                ฟุตบอล
                            </Badge>
                        </Row>
                    </Col>


                    {/* outliner n' desc */}
                    <Col style={{ marginTop: '-10px' }} span={24}>
                        <Row type='flex' justify='start'>
                            {/* outliner */}
                            <Outline>
                                เลือกช่วงเวลา
                            </Outline>

                            {/* description */}
                            <Col
                                style={{
                                    marginTop: '-20px',
                                    color: '#666666',
                                    fontSize: '12px'
                                }}
                                span={20}>
                                <p>
                                    เลือกช่วงเวลาที่ต้องการจอง สามารถจองได้ครั้งละ 1 ชั่วโมง
                                </p>
                            </Col>

                            {/* borderline */}
                            <Col span={24}>
                                <BreakingLine />
                            </Col>
                        </Row>

                        {/* BadgeDaySelector */}
                        <Col span={24}>
                            <BadgeDateSelector
                                start={moment().startOf('day')}
                                stop={moment().startOf('day').add(1, 'day')}
                                select={dateSelect}
                                onSelect={this.onSelectDate}
                            />
                        </Col>
                    </Col>

                    {/* spacing */}
                    <div style={
                        { height: '8px' }
                    } />

                    {/* Date Outliner */}
                    <Col span={24}>
                        <Row type='flex' justify='center'>
                            <Badge>
                                <span style={{
                                    color: '#FF682B',
                                    fontWeight: 'bold',
                                    fontSize: '18px'
                                }}>
                                    วันที่ {dateSelect.format('DD MMMM YYYY')}
                                </span>
                            </Badge>
                        </Row>
                    </Col>

                    {/* icon detail */}
                    <Col span={24}>
                        <Row type='flex' justify='center'>
                            {iconSquare('ว่าง', orangeSquareIcon)}
                            {iconSquare('ไม่ว่าง/รอการอนุมัติ', greySquareIcon)}
                            {iconSquare('ที่ถูกเลือก', blueSquareIcon)}

                        </Row>
                    </Col>


                    {/* TimeTable */}
                    <Col span={24}>
                        <TimeTable
                            start={moment().startOf('hour')}
                            stop={moment().add(22, 'hour')}
                            interval={60}
                            onSelect={this.onSelectTime}
                        />
                    </Col>

                </PageLayout>
            </React.Fragment >
        )
    }
}

const stepLists: StepsType[] = [
    {
        label: '1'
    },
    {
        label: '2'
    },
    {
        label: '3'
    },
]

const iconLabel: React.CSSProperties = {
    color: '#3B4046',
    fontSize: '14px',
    marginLeft: '5px',
    marginTop: '14px'
}

const iconSquare = (text?: string, icon?: string) => (
    <div style={{ display: 'flex', padding: '0px 10px 0px 10px' }}>
        <img src={icon} alt="icon" />
        <p style={iconLabel}>
            {text || ''}
        </p>
    </div>
)