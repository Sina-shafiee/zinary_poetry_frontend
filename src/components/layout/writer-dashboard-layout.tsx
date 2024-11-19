import { Outlet } from 'react-router-dom';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import WriterDashboardSidebar from './writer-dashboard-sidebar';

const WriterDashboardLayout = () => {
  return (
    <SidebarProvider>
      <WriterDashboardSidebar />
      <main className="w-full">
        <SidebarTrigger className="md:hidden" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default WriterDashboardLayout;
