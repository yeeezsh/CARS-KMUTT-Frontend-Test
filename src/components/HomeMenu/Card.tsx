import React from 'react'
import styles from './card.module.css'
import Menu from './menu.interface'
export default function Card(props: {
    icon?: string, label: string,
    setting?: Menu
}) {
    const { label, icon } = props
    return (
        <div className={styles.card}>
            <div style={{ padding: 10 }}>
                <img style={{ width: 65 }} src={icon} alt={label} />
                <p>{label}</p>
            </div>
        </div>
    )
}
