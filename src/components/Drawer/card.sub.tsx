import React from 'react'
import { Row, Col } from 'antd'

// import styles from './styles.module.css'
// import styles from './styles.module.css'
import styles from './styles.module.css'
import { Drawer } from './drawer.interface'

export default function CardSub(props: {
    key: string,
    subkey: string,
    settings?: Drawer['settings'],
    icon: Drawer['icon'],
    label: Drawer['label'],
    link?: Drawer['link'],
}) {
    const { key, subkey, label, icon, settings } = props
    return (
        <Col key={key + '.' + subkey} className={styles.sub} span={22}>
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
                <Col offset={1} span={19}>
                    {label}
                </Col>
            </Row>
        </Col>
    )
}
