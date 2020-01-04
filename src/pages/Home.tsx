import React from 'react'
// import {} from '../components/Layout/Home'
import HomeLayout from '../components/Layout/Home'
import { DatePicker } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;



export default function Home() {
    console.log('home')
    return (
        <HomeLayout>
            <MonthPicker/>
        </HomeLayout>
    )
}
