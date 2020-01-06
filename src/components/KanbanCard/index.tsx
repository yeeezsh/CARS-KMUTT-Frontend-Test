import React from 'react'
import { Row, Col } from 'antd'
import Card from './Card'
import Menu from './menu.interface'

import { basketball, footballarea, docs, check } from './icon.import'

export default function HomeMenu(props: { menu?: Menu[] }) {
    const menu = props.menu ? props.menu : defaultMenu
    return (
        <React.Fragment>
            <Row type='flex' justify='space-between'>
                {
                    menu && menu.map(({ icon, label, setting, key }) =>
                        (
                            <Col key={key} span={11}>
                                <Card
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

const defaultMenu: Menu[] = [
    {
        key: '1',
        label: ['จองสนามกีฬา'],
        icon: basketball,
        link: '/reserve/sport',
        setting: {
            backgroundColor: '#FF682B'
        }
    },
    {
        key: '2',
        label: [`
        จองพื้นจัดกิจกรรม
        / ห้องประชุม`],
        icon: footballarea,
        setting: {
            backgroundColor: '#1890FF',
            iconSize: 50
        }
    },
    {
        key: '3',
        label: ['กำลังดำเนินการ'],
        icon: docs,
        setting: {
            labelColor: '#666666'
        }
    },
    {
        key: '4',
        label: ['รีเควสที่ต้องยืนยัน'],
        icon: check,
        setting: {
            labelColor: '#666666'
        }
    },
]
