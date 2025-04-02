
import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainLayout } from './MainLayout';
import { MobileLayout } from './MobileLayout';
import { useMobile } from '@/hooks/use-mobile';

const Layout: React.FC = () => {
  const isMobile = useMobile();

  // Render different layouts based on device type
  return (
    <>
      {isMobile ? (
        <MobileLayout>
          <Outlet />
        </MobileLayout>
      ) : (
        <MainLayout>
          <Outlet />
        </MainLayout>
      )}
    </>
  );
};

export default Layout;
