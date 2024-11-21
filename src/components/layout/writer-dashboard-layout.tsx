import { Outlet } from 'react-router-dom';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import WriterDashboardSidebar from './writer-dashboard-sidebar';

const WriterDashboardLayout = () => {
  return (
    <SidebarProvider>
      <WriterDashboardSidebar />
      <main className="w-full p-2 pb-12 lg:pe-4">
        <div className="h-20 rounded shadow bg-card flex items-center ps-4 gap-2">
          <SidebarTrigger />
          <p>هدر وبسایت اینجا قرار خواهد گرفت D:</p>
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default WriterDashboardLayout;
