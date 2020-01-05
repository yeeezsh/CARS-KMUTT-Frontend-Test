import React from 'react'
import { Row, Col } from 'antd'
import Card from './Card'
import Menu from './menu.interface'

import backetball from '../../assets/icons/menu/basketball.svg'


const menu: Menu[] = [
    {
        label: 'จองสนามกีฬา',
        icon: backetball
    },
    {
        label: 'จองสนามกีฬา',
        icon: backetball
    },
    {
        label: 'จองสนามกีฬา',
        icon: backetball
    },
]

export default function HomeMenu() {
    return (
        <React.Fragment>
            {/* <Row type='flex' justify='space-between'>
                <Col span={11}>
                    <Card />
                </Col>
                <Col span={11}>
                    <Card />
                </Col>

            </Row> */}
            <Row type='flex' justify='space-between'>
                {
                    menu && menu.map(({ icon, label, setting }) =>
                        (
                            <Col span={11}>
                                <Card
                                    label={label}
                                    icon={icon}
                                />
                            </Col>)
                    )
                }
            </Row>
        </React.Fragment>
    )
}
