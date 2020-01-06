import React from 'react'
import { Row, Col } from 'antd'
import Card from './Card'
import Menu from './menu.interface'

import backetball from '../../assets/icons/menu/basketball.svg'


const menu: Menu[] = [
    {
        key: '1',
        label: 'จองสนามกีฬา',
        icon: backetball,
        link: '/reserve/sport',
        setting: {
            backgroundColor: '#FF682B'
        }
    },
    {
        key: '2',
        label: `
        จองพื้นจัดกิจกรรม
        / ห้องประชุม`,
        icon: backetball,
        setting: {
            backgroundColor: '#1890FF'
        }
    },
    {
        key: '3',
        label: 'จองสนามกีฬา',
        icon: backetball
    },
]

export default function HomeMenu() {
    return (
        <React.Fragment>
            <Row type='flex' justify='space-between'>
                {
                    menu && menu.map(({ icon, label, setting, key }) =>
                        (
                            <Col span={11}>
                                <Card
                                    key={key}
                                    label={label}
                                    icon={icon}
                                    setting={setting}
                                />
                            </Col>)
                    )
                }
            </Row>
        </React.Fragment>
    )
}
