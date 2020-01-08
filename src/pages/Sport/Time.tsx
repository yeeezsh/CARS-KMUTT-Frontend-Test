import React from 'react'
import { Col, Row, Badge } from 'antd'
import moment, { Moment } from 'moment'

import BreakingLine from '../../components/BreakingLine'
import Outline from '../../components/Outline'
import BadgeDateSelector from '../../components/BadgeDateSelector'
import TimeTable from '../../components/TimeTable'

import orangeSquareIcon from '../../assets/icons/square/orange.svg'
import greySquareIcon from '../../assets/icons/square/grey.svg'
import blueSquareIcon from '../../assets/icons/square/blue.svg'

// import TimeNode from '../../components/TimeTable/timetable.interface'
import TimeAreaReserveType from './time.interface'

const TimePage: React.FunctionComponent<
    TimeAreaReserveType
> = (props) => {
    return (
        <React.Fragment>
            {/* outliner n' desc */}
            <Col style={{ marginTop: '-10px' }} span={24}>
                <Row type='flex' justify='start'>
                    {/* outliner */}
                    <Outline>
                        เลือกช่วงเวลา
                         </Outline>

                    {/* description */}
                    <Col
                        style={{
                            marginTop: '-20px',
                            color: '#666666',
                            fontSize: '12px'
                        }}
                        span={20}>
                        <p>
                            เลือกช่วงเวลาที่ต้องการจอง สามารถจองได้ครั้งละ 1 ชั่วโมง
                             </p>
                    </Col>

                    {/* borderline */}
                    <Col span={24}>
                        <BreakingLine />
                    </Col>
                </Row>

                {/* BadgeDaySelector */}
                <Col span={24}>
                    <BadgeDateSelector
                        start={props.date.start}
                        stop={props.date.stop}
                        select={props.date.selected}
                        onSelect={props.onSelectDate}
                    />
                </Col>
            </Col>

            {/* spacing */}
            <div style={
                { height: '8px' }
            } />

            {/* Date Outliner */}
            <Col span={24}>
                <Row type='flex' justify='center'>
                    <Badge>
                        <span style={{
                            color: '#FF682B',
                            fontWeight: 'bold',
                            fontSize: '18px'
                        }}>
                            {/* วันที่ {dateSelect.format('DD MMMM YYYY')} */}
                        </span>
                    </Badge>
                </Row>
            </Col>

            {/* icon detail */}
            <Col span={24}>
                <Row type='flex' justify='center'>
                    {iconSquare('ว่าง', orangeSquareIcon)}
                    {iconSquare('ไม่ว่าง/รอการอนุมัติ', greySquareIcon)}
                    {iconSquare('ที่ถูกเลือก', blueSquareIcon)}

                </Row>
            </Col>


            {/* TimeTable */}
            {
                props.areas && props.areas.map((e, i) => (
                    <Col
                        key={i}
                        span={24}
                        onClick={props.onSelectArea(e.area)}
                    >
                        <TimeTable
                            title={e.area.label}
                            start={e.time.start}
                            stop={e.time.stop}
                            interval={60}
                            onSelect={props.onSelectTime}
                            disabled={e.time.disabled}
                        />
                    </Col>
                ))
            }

        </React.Fragment>
    )
}
export default TimePage

const iconLabel: React.CSSProperties = {
    color: '#3B4046',
    fontSize: '14px',
    marginLeft: '5px',
    marginTop: '14px'
}

const iconSquare = (text?: string, icon?: string) => (
    <div style={{ display: 'flex', padding: '0px 10px 0px 10px' }}>
        <img src={icon} alt="icon" />
        <p style={iconLabel}>
            {text || ''}
        </p>
    </div>
)

