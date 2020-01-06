import React from 'react'
import { Drawer } from 'antd'

import hamburgerWhite from '../../assets/icons/hamburger-white.svg'

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
        </Drawer>
    )
}
