import React, { Component } from 'react'
import { Row, Col, Drawer } from 'antd'
import moment from 'moment'
import styles from './home.module.css'
// import hamburgerOrange from '../../assets/icons/hamburger-orange.svg'
import hamburgerWhite from '../../assets/icons/hamburger-white.svg'
import TitleCard from '../TitleCard/TitleCard'

export default class Home extends Component<{}, { drawer: boolean, day: moment.Moment }> {

    state = {
        drawer: false,
        day: moment('30/11/20', 'DD-MM-YY')
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
                <Drawer
                    placement={'left'}
                    closable={false}
                    maskClosable={true}
                    onClose={this.onDrawer}
                    visible={drawer}
                    drawerStyle={{ backgroundColor: '#FF682B' }}
                >
                    <img onClick={this.onDrawer} src={hamburgerWhite} alt='hamburger' />
                </Drawer>
                <Row className={styles.header}>
                    <Col className={styles.btn} span={1}>
                        <img onClick={this.onDrawer} src={hamburgerWhite} alt='hamburger' />
                    </Col>
                    <Col className={styles.title} span={12} offset={5}>
                        <p className={styles.white}>หน้าแรก</p>
                    </Col>
                </Row>

                {/* date and time */}
                <Row className={styles.date}>
                    <div className={styles.textDate}>Today</div>
                    <div className={styles.textDate}>{dayName}, {date} {month} {year}</div>
                </Row>

                {/* card */}
                <Row className={styles.card}>
                    <Col span={24}>
                        <TitleCard
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
                <Row style={{ marginTop: 50, padding: 0 }}>
                    <div className={styles.content}>{this.props.children}</div>
                </Row>
            </React.Fragment>
        )
    }
}
