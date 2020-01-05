import React, { Component, Props } from 'react'
import { Row, Col, Drawer } from 'antd'
import styles from './home.module.css'
import hamburgerOrange from '../../assets/icons/hamburger-orange.svg'
import hamburgerWhite from '../../assets/icons/hamburger-white.svg'

export default class Home extends Component<{}, { drawer: boolean }> {

    state: { drawer: boolean } = {
        drawer: false
    }

    onDrawer = () => {
        this.setState(prevState => {
            return {
                drawer: !prevState.drawer
            }
        })
    };

    render() {
        return (
            <React.Fragment>
                <Drawer
                    placement={'left'}
                    closable={false}
                    maskClosable={true}
                    onClose={this.onDrawer}
                    visible={this.state.drawer}
                    drawerStyle={{ backgroundColor: '#FF682B' }}
                >
                    <img onClick={this.onDrawer} src={hamburgerWhite} alt='hamburger' />
                </Drawer>
                <Row className={styles.header}>
                    <Col className={styles.btn} span={1}>
                        <img onClick={this.onDrawer} src={hamburgerOrange} alt='hamburger' />
                    </Col>
                    <Col className={styles.title} span={12} offset={5}>
                        <p className={styles.orange}>หน้าแรก</p>
                    </Col>
                </Row>
                <div onClick={() => console.log('jaa')} style={{ height: 300, backgroundColor: 'black' }}>sider</div>
                <Row style={{ marginTop: 50, padding: 0 }}>
                    <div>{this.props.children}</div>
                </Row>
            </React.Fragment>
        )
    }
}
