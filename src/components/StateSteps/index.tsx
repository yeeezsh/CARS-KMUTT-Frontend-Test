import React from 'react'
import { Row, Col } from 'antd'
import StepsType from './step.interface'

import styles from './styles.module.css'

const dotStyle = (styles?: 'passed' | 'current' | 'next'): React.CSSProperties => {
    switch (styles) {
        case 'passed':
            return {
                backgroundColor: '#FF682B',
                color: '#FFFFFF'
            }
        case 'current':
            return {
                backgroundColor: '#1890FF',
                fontWeight: 'bold',
                color: '#FFFFFF'
            }
        default:
            return {
                color: '#dadada'
            }

    }
}


const StateSteps: React.FunctionComponent<{
    steps: StepsType[],
    current: number
}> = (props) => {
    const { steps, current } = props
    return (
        <React.Fragment>
            <div className={styles.dash} />
            <Row type='flex' justify={'space-between'}>
                {
                    steps.map((e, i) => {
                        let dot: 'next' | 'current' | 'passed' = 'next'
                        if (i < current) dot = 'passed'
                        if (i === current) dot = 'current'
                        return (
                            <Col
                                key={i}
                                className={styles.dot}
                                span={2}
                                style={dotStyle(dot)}
                            >
                                <p className={styles.label}>
                                    {e.label}
                                </p>
                            </Col>
                        )
                    })
                }
            </Row>
        </React.Fragment>
    )
}

export default StateSteps
