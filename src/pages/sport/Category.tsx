import React from 'react'
import KanBanLayout from '../../components/Layout/Kanban'
import KanbanCard from '../../components/KanbanCard'
import Menu from '../../components/KanbanCard/menu.interface'

import footballIcon from '../../assets/icons/sport/football.svg'

export default function Category() {
    // map setting
    const categoryMenu = menu.map(e => {
        return {
            ...e,
            setting: {
                center: true,
                iconSize: 70,
                labelColor: "#666666",
            }
        }
    })
    return (
        <KanBanLayout
            title={'จองสนามกีฬา'}
            outline={'เลือกประเภทกีฬา'}
        >
            <KanbanCard menu={categoryMenu} />
        </KanBanLayout>
    )
}


const menu: Menu[] = [
    {
        key: '1',
        label: ['ฟุตบอล', 'football'],
        icon: footballIcon,
    },
    {
        key: '1',
        label: ['ฟุตบอล', 'football'],
        icon: footballIcon,
    },
    {
        key: '1',
        label: ['ฟุตบอล', 'football'],
        icon: footballIcon,
    },
    {
        key: '1',
        label: ['ฟุตบอล', 'football'],
        icon: footballIcon,
    },
]