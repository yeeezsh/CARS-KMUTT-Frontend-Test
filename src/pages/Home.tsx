import React from 'react'
// import {} from '../components/Layout/Home'
import HomeLayout from '../components/Layout/Home'
import HomeMenu from '../components/HomeMenu'



export default function Home() {
    console.log('home')
    return (
        <HomeLayout>
            {/* <p>HOME JSAAAAA</p> */}
            <HomeMenu/>
        </HomeLayout>
    )
}
