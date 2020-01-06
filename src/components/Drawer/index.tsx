import React from 'react'
import { Drawer, Row, Col } from 'antd'
import { Drawer as DrawerType } from './drawer.interface'

import styles from './drawer.module.css'

import hamburgerWhite from '../../assets/icons/hamburger-white.svg'
import homeIcon from '../../assets/icons/drawer/home.svg'

const menu: DrawerType[] = [
    {
        key: '1',
        label: 'หน้าหลัก',
        icon: homeIcon,
        link: '/'
    }
]

export default function AppDrawer(props: { drawer: boolean, onDrawer: any }) {
    const { drawer } = props
    return (
        <Drawer
            placement={'left'}
            closable={false}
            maskClosable={true}
            onClose={props.onDrawer}
            visible={drawer}
            drawerStyle={{ backgroundColor: '#FF682B' }}
        >
            <img onClick={props.onDrawer} src={hamburgerWhite} alt='hamburger' />

            {/* menu */}
            <Row className={styles.container} type='flex' justify='space-around'>
                <Col className={styles.main} span={22}>
                    <Row type='flex' justify='start'>
                        <Col span={2}>
                            <img
                                src={homeIcon}
                                alt="euei" />
                        </Col>
                        <Col offset={2} span={18}>
                            หน้าแรก
                        </Col>
                    </Row>
                </Col>

                <Col className={styles.sub} span={22}>
                    <Row type='flex' justify='start'>
                        <Col span={2}>
                            <img
                                src={homeIcon}
                                alt="euei" />
                        </Col>
                        <Col offset={2} span={18}>
                            หน้าแรก
                        </Col>
                    </Row>
                </Col>

            </Row>
        </Drawer>
    )
}
