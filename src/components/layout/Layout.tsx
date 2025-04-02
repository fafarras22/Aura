
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useMobile } from '@/hooks/use-mobile';

const Layout: React.FC = () => {
  const isMobile = useMobile();

  return (
    <div className="min-h-screen flex flex-col">
      {/* The Outlet component renders the current route's element */}
      <Outlet />
    </div>
  );
};

export default Layout;
