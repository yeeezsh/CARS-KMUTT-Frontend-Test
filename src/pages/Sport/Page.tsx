import React, { Component } from 'react'
import { Row, Col } from 'antd'
import moment, { Moment } from 'moment'
import { Route, Switch } from 'react-router'

// import history from '../history'
import TimePage from './Time'
import PageLayout from '../../components/Layout/Page'
import Badge from '../../components/Badge'
import StateSteps from '../../components/StateSteps'

import StepsType from '../../components/StateSteps/step.interface'
import TimeNode from '../../components/TimeTable/timetable.interface'
import Area from './area.interface'

class SportPage extends Component<
    {},
    {
        dateSelected: Moment
        timeSelected: Moment | undefined,
        areaSelected: Area['area'] | undefined,
        state: number
    }
    > {

    state = {
        dateSelected: moment().startOf('day'),
        timeSelected: undefined,
        areaSelected: undefined,
        state: 0,
    }

    onSelectDate = (date: Moment) => {
        console.log('ddd', date.format('DD'))
        return this.setState({
            dateSelected: date
        })
    }

    onSelectTime = (time: TimeNode) => {
        console.log('ttt', time.value.format('hh.mm'))
        if (time.type === 'disabled') return
        return this.setState({ timeSelected: time.value })
    }

    onSelectArea = (area: Area['area']) => {
        console.log('aaa', area.id)
        return this.setState({ areaSelected: area })
    }

    render() {
        console.log(this.state)
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

                    <Switch>
                        <Route path='*/1'>
                            <TimePage
                                onSelectDate={this.onSelectDate}
                                onSelectTime={this.onSelectTime}
                                onSelectArea={this.onSelectArea}
                                date={{
                                    start: moment(),
                                    stop: moment().add(12, "hour"),
                                    selected: this.state.dateSelected
                                }}
                                areas={[
                                    {
                                        time: {
                                            start: moment().startOf('hour'),
                                            stop: moment().startOf('hour').add(12, 'hour'),
                                            disabled: [{
                                                value: moment().startOf('hour').add(1, "hour")
                                            }]
                                        },
                                        area: {
                                            label: 'สนามฟุตบอล',
                                            id: '1'
                                        }

                                    }
                                ]}
                            />
                        </Route>
                    </Switch>

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

export default SportPage