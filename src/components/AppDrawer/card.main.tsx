import React from 'react'
import { Row, Col } from 'antd'

import styles from './styles.module.css'
import { Drawer } from './drawer.interface'

export default function CardMain(props: {
    settings: Drawer['settings'],
    icon: Drawer['icon'],
    label: Drawer['label'],
}) {
    const { icon, label, settings } = props
    return (
        <Col className={styles.main} span={22}>
            <Row type='flex' justify='start'>
                <Col span={3}>
                    <Row type='flex' justify='center'>
                        <Col>
                            <img
                                height={
                                    settings?.iconSize
                                    || undefined
                                }
                                src={icon}
                                alt={label}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col offset={2} span={19}>
                    {label}
                </Col>
            </Row>
        </Col>
    )
}
