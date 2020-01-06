import React from 'react'
import { Drawer, Row, Col } from 'antd'
import { Drawer as DrawerType } from './drawer.interface'

import CardMain from './card.main'
import CardSub from './card.sub'

import styles from './styles.module.css'

import hamburgerWhite from '../../assets/icons/hamburger-white.svg'
import homeIcon from '../../assets/icons/drawer/home.svg'
import basketballIcon from '../../assets/icons/drawer/basketball.svg'
import footballareaIcon from '../../assets/icons/drawer/footballarea.svg'
import ticketIcon from '../../assets/icons/drawer/ticket.svg'
import docsIcon from '../../assets/icons/drawer/docs.svg'
import checkedIcon from '../../assets/icons/drawer/checked.svg'
import timeIcon from '../../assets/icons/drawer/time.svg'

const menu: DrawerType[] = [
    {
        key: '1',
        label: 'หน้าหลัก',
        icon: homeIcon,
        link: '/',
    },
    {
        key: '2',
        label: 'จองสนามกีฬา',
        icon: basketballIcon,
        link: '/reserve/sport'
    },
    {
        key: '3',
        label: 'จองพื้นที่จัดกิจกรรม /ห้องประชุม',
        icon: footballareaIcon,
        link: '/reserve/test'
    },
    {
        key: '4',
        label: 'การจองของฉัน',
        icon: ticketIcon,
        link: '/reserve/test',
        sub: [
            {
                key: '1',
                label: 'กำลังดำนเนินการ',
                icon: docsIcon,
                link: '/reserve/process'
            },
            {
                key: '2',
                label: 'รีเควสที่ต้องยืนยัน',
                icon: checkedIcon,
                link: '/reserve/request'
            },
            {
                key: '3',
                label: 'ประวัติการจอง',
                icon: timeIcon,
                link: '/reserve/history'
            },
        ]
    },
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
                {
                    menu && menu.map(({ key, label, icon, settings, sub }) => {
                        return (
                            <React.Fragment>
                                <CardMain
                                    key={key}
                                    label={label}
                                    icon={icon}
                                    settings={settings}
                                />
                                {
                                    sub && sub.map(e => (
                                        <CardSub
                                            key={key}
                                            subkey={e.key}
                                            icon={e.icon}
                                            link={e.link}
                                            settings={e.settings}
                                            label={e.label}
                                        />
                                        // <Col key={key + '.' + e.key} className={styles.sub} span={22}>
                                        //     <Row type='flex' justify='start'>
                                        //         <Col span={3}>
                                        //             <Row type='flex' justify='center'>
                                        //                 <Col>
                                        //                     <img
                                        //                         height={
                                        //                             e.settings?.iconSize
                                        //                             || undefined
                                        //                         }
                                        //                         src={e.icon}
                                        //                         alt={e.label}
                                        //                     />
                                        //                 </Col>
                                        //             </Row>
                                        //         </Col>
                                        //         <Col offset={1} span={19}>
                                        //             {e.label}
                                        //         </Col>
                                        //     </Row>
                                        // </Col>
                                    ))
                                }
                            </React.Fragment>
                        )
                    })
                }
            </Row>
        </Drawer>
    )
}
