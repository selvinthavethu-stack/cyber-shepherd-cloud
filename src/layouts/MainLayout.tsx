import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/dfir/AppSidebar';

export const MainLayout = () => (
  <div className="min-h-screen bg-background grid-pattern">
    <AppSidebar />
    <main className="ml-60 p-6">
      <Outlet />
    </main>
  </div>
);
