import React, { Component } from 'react'
import { Row, Col } from 'antd'
import moment from 'moment'
import AppDrawer from '../AppDrawer'

import styles from './home.module.css'

import hamburgerWhite from '../../assets/icons/hamburger-white.svg'
import StateCard from '../StateCard/StateCard'

export default class Home extends Component<{}, { drawer: boolean, day: moment.Moment }> {

    state = {
        // day: moment('30/11/20', 'DD-MM-YY'),
        drawer: false,
        day: moment()
    }

    onDrawer = () => {
        this.setState(prevState => {
            return {
                drawer: !prevState.drawer
            }
        })
    };

    render() {
        const { day, drawer } = this.state
        const dayName = day.format('ddd')
        const date = day.format('D')
        const month = day.format('MMMM')
        const year = day.format('YYYY')
        return (
            <React.Fragment>
                <Row className={styles.header}>
                    <Col className={styles.btn} span={1}>
                        <img onClick={this.onDrawer} src={hamburgerWhite} alt='hamburger' />
                    </Col>
                    <Col className={styles.title} span={12} offset={5}>
                        <p className={styles.white}>หน้าแรก</p>
                    </Col>
                </Row>

                {/* AppDrawer */}
                <AppDrawer onDrawer={this.onDrawer} drawer={drawer} />

                {/* spacing */}
                <div style={{ height: 325 }}></div>

                {/* date and time */}
                <Row className={styles.date}>
                    <div className={styles.textDate}>Today</div>
                    <div className={styles.textDate}>{dayName}, {date} {month} {year}</div>
                </Row>

                {/* card */}
                <Row className={styles.card}>
                    <Col span={24}>
                        <StateCard
                            name={'Badminton 1'}
                            reserve={{
                                date: moment(),
                                start: moment(),
                                stop: moment().add(1, 'hour'),
                                state: {
                                    type: 'wait',
                                    desc: 'รอการยืนยัน'
                                }
                            }}
                        />
                    </Col>
                </Row>

                {/* content */}
                <Row style={{ marginTop: 30, padding: 0 }}>
                    <Col className={styles.content}>{this.props.children}</Col>
                </Row>


            </React.Fragment>
        )
    }
}
