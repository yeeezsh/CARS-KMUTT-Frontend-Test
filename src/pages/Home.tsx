import React from 'react';
// import {} from '../components/Layout/Home'
import HomeLayout from '../components/Layout/Home';
import HomeMenu from '../components/KanbanCard';

export default function Home() {
  return (
    <HomeLayout>
      <HomeMenu />
    </HomeLayout>
  );
}
