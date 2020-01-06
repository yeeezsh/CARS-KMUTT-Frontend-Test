import React from 'react'
import { Row, Col } from 'antd'
import Card from './Card'
import Menu from './menu.interface'

import backetball from '../../assets/icons/menu/basketball.svg'
import footballarea from '../../assets/icons/menu/footballarea.svg'
import docs from '../../assets/icons/menu/docs.svg'
import check from '../../assets/icons/menu/check.svg'



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
        icon: footballarea,
        setting: {
            backgroundColor: '#1890FF',
            iconSize: 50
        }
    },
    {
        key: '3',
        label: 'กำลังดำเนินการ',
        icon: docs,
        setting: {
            labelColor: '#666666'
        }
    },
    {
        key: '4',
        label: 'รีเควสที่ต้องยืนยัน',
        icon: check,
        setting: {
            labelColor: '#666666'
        }
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
