import React, { Component } from 'react'
import { Row, Col } from 'antd'
import moment, { Moment } from 'moment'

import Outline from '../../components/Outline'
import PageLayout from '../../components/Layout/Page'
import Badge from '../../components/Badge'
import BadgeDateSelector from '../../components/BadgeDateSelector'
import StateSteps from '../../components/StateSteps'
import StepsType from '../../components/StateSteps/step.interface'

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
    render() {
        const { dateSelect } = this.state
        return (
            <React.Fragment>
                <PageLayout titile={'จองสนามกีฬา'}>

                    <div style={{ height: '25px' }} />

                    {/* steps */}
                    <Col span={24}>
                        <Row type='flex' justify='center'>
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
                                <Row type='flex' justify='center'>
                                    <Col span={22}>
                                        <div style={{
                                            border: '1px solid #DADADA',
                                            marginTop: '-4px'
                                        }} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {/* spacing */}
                        <div style={{ height: '8px' }} />

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
                </PageLayout>
            </React.Fragment>
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
