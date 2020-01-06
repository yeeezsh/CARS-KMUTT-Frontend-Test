import React from 'react'
import moment, { Moment } from 'moment'
import { Row, Col } from 'antd'

import styles from './styles.module.css'
import Badge from './badge'

const card = (date: Moment, selected: boolean) => (
    <div className={styles.card}>
        <div className={
            selected ? styles.selected
                :
                styles.unselected
        }>
            <p className={styles.date}>
                {date.format('D')}
            </p>
            <p className={styles.month}>
                {date.format('MMM')}
            </p>
        </div>
    </div >
)

function DateCmp(d1: Moment, d2: Moment) {
    if (
        d1.format('DD-MM-YYYY')
        ===
        d2.format('DD-MM-YYYY')
    ) {
        return true
    }
    return false
}

const BadgeDateSelector: React.FunctionComponent<
    {
        start: Moment,
        stop: Moment,
        select: Moment,
        onSelect: any
    }
> = (props) => {
    const { start, stop, onSelect } = props
    let { select } = props
    select = select.startOf('day')
    const dates = []
    let cur = start.startOf('day').add(-1, 'day')
    while (cur < stop) {
        dates.push(cur)
        cur = moment(cur.add(1, 'day').startOf('day'))
    }
    return (
        <Row type='flex' justify='center'>
            {
                dates && dates.map((d, i) => {
                    return (
                        <div
                            onClick={() => onSelect(d)}
                            key={i}>
                            {
                                <Badge active={DateCmp(d, select)}>
                                    {
                                        card(d, DateCmp(d, select))
                                    }
                                </Badge>
                            }
                        </div>
                    )
                })
            }
        </Row>
    )
}
export default BadgeDateSelector
