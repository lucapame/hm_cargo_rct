import React from 'react';
import TopBar from '../components/layout/component.topBar';
import { Outlet } from 'react-router';
import MainNavigation from '../components/layout/component.mainNav';
import { withGuard } from '../components/routes/withGuard.component';

const MainPage = () => {
  return (
    <div>
      <TopBar />
      <MainNavigation />
      <div className='container-lg overflow-auto'>
        <Outlet />
      </div>
    </div>
  );
};

export default withGuard(MainPage);
