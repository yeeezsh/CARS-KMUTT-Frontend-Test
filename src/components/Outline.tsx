import React from 'react'

const style: React.CSSProperties = {
    color: '#FF682B',
    fontSize: '24px',
    lineHeight: '36px',
    fontWeight: 'bold'
}

export default function Outline(props: { text: string }) {
    return (
        <p style={style}>{props.text}</p>
    )
}
