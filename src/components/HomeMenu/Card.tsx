import React from 'react'
import styles from './card.module.css'
import Menu from './menu.interface'
export default function Card(props: {
    icon?: string, label: string,
    setting?: Menu['setting']
}) {
    const { label, icon, setting } = props
    return (
        <div style={{ backgroundColor: setting?.backgroundColor }} className={styles.card}>
            <div className={styles.container}>
                <img style={{ width: 65 }} src={icon} alt={label} />
                <p className={styles.label}>{label}</p>
            </div>
        </div>
    )
}
