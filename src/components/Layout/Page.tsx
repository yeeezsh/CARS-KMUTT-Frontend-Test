import React, { Component, Props as PageProps } from 'react'
import { Row, Col, Drawer } from 'antd'
import styles from './page.module.css'
import hamburgerOrange from '../../assets/icons/hamburger-orange.svg'
// import hamburgerWhite from '../../assets/icons/hamburger-white.svg'
import AppDrawer from '../AppDrawer'

export default class PageLayout extends Component<
    {
        titile: string,
    },
    {
        drawer: boolean
    }> {

    state = {
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
        const { drawer } = this.state
        console.log(React.Children.count(this.props.children))
        return (
            <Row >
                {/* header */}
                <Row className={styles.header}>
                    <Col className={styles.btn} span={1}>
                        <img onClick={this.onDrawer} src={hamburgerOrange} alt='hamburger' />
                    </Col>
                    <Col className={styles.title} span={12} offset={5}>
                        <p className={styles.orange}>{this.props.titile}</p>
                    </Col>
                </Row>

                {/* AppDrawer */}
                <AppDrawer onDrawer={this.onDrawer} drawer={drawer} />

                {/* content */}
                <Row style={{ marginTop: 75 }} type='flex' justify='center'>
                    {
                        React.Children.map(this.props.children, child => (
                            <Col span={22}>
                                {child}
                            </Col>
                        ))
                    }
                </Row>
            </Row>
        )
    }
}
