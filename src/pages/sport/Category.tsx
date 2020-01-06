import React from 'react'
import KanBanLayout from '../../components/Layout/Kanban'
import KanbanCard from '../../components/KanbanCard'

export default function Category() {
    return (
        <KanBanLayout
            title={'จองสนามกีฬา'}
            outline={'เลือกประเภทกีฬา'}
        >
            <KanbanCard />
        </KanBanLayout>
    )
}
