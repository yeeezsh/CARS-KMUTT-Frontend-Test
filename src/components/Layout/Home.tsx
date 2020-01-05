import React, { Component } from 'react'
import { Row, Col } from 'antd'
import styles from './home.module.css'
import hamburger from '../../assets/icons/hamburger-orange.svg'

export default class Home extends Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    state = {
        collapsed: true
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <React.Fragment>
                <Row className={styles.header}>
                    <Col className={styles.btn} span={1}>
                        <img src={hamburger} alt='hamburger' />
                    </Col>
                    <Col className={styles.title} span={12} offset={5}>
                        <p className={styles.orange}>hoome</p>
                    </Col>
                </Row>
                <div>sider</div>
                <Row style={{ marginTop: 50, padding: 0 }}>
                    <div>{this.props.children}</div>
                </Row>
            </React.Fragment>
        )
    }
}
