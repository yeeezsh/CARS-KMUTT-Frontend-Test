import React from 'react'
import KanBanLayout from '../../components/Layout/Kanban'
import KanbanCard from '../../components/KanbanCard'
import Menu from '../../components/KanbanCard/menu.interface'

import footballIcon from '../../assets/icons/sport/football.svg'
import badmintonIcon from '../../assets/icons/sport/badminton.svg'
import basketballIcon from '../../assets/icons/sport/basketball.svg'
import tennisIcon from '../../assets/icons/sport/tennis.svg'
import volleyballIcon from '../../assets/icons/sport/volleyball.svg'

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
        link: '/reserve/sport/1'
    },
    {
        key: '2',
        label: ['แบดมินตัน', 'badminton'],
        icon: badmintonIcon,
    },
    {
        key: '3',
        label: ['บาสเก็ตบอล', 'basketball'],
        icon: basketballIcon,
    },
    {
        key: '4',
        label: ['เทนนิส', 'tennis'],
        icon: tennisIcon,
    },
    {
        key: '5',
        label: ['วอลเลย์บอล', 'volleyball'],
        icon: volleyballIcon,
    },
]