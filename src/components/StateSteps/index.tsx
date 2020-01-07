import React from 'react'
import { Row, Col } from 'antd'

import styles from './styles.module.css'

interface StepsType {
    label: string,
    loading?: boolean,
    styles?: {
        labelColor: string,
        bgColor: string,
    }
}
const StateSteps: React.FunctionComponent<{
    steps: StepsType[]
}> = () => {
    return (
        <React.Fragment>
            <div className={styles.dash} />
            <Row type='flex' justify={'center'}>
                <Col className={styles.dot} span={2}>
                    <p className={styles.label}>
                        1
                    </p>
                </Col>
                <Col span={2}>
                    1
            </Col>
                <Col span={2}>
                    1
            </Col>

            </Row>
        </React.Fragment>
    )
}

export default StateSteps
