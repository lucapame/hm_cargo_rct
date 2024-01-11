import React from 'react';
import TopBar from './component.topBar';

const BasicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TopBar />
      <>{children}</>
    </>
  );
};

export default BasicLayout;
