'use client';

import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { LayoutDashboard, Users, Settings, MapPin, FileText, UserStar } from 'lucide-react';
import type { NavGroup } from '../../types/navigation';
import { ProtectedLayout } from './protected-layout';

const navs: NavGroup[] = [
  {
    title: "Management",
    items: [
      { label: "Dashboard", icon: <LayoutDashboard size={18}/>, path: "/" },
      { label: "Regions", icon: <MapPin size={18}/>, path: "/regions", count: 12 },
      { label: "Places", icon: <Settings size={18}/>, path: "/places" },
      { label: "Bookings", icon: <FileText size={18}/>, path: "/bookings" },
    ]
  },
  {
    title: "Administration",
    items: [
      { label: "Users", icon: <Users size={18}/>, path: "/users" },
      { label: "Managers", icon: <UserStar size={18}/>, path: "/managers" },
    ]
  },
];


export const AppLayout = () => {
  return (
    <ProtectedLayout>
      <div className="flex w-full h-screen bg-background overflow-hidden font-sans selection:bg-primary/50">
      


        {/* 2. SIDEBAR */}
        <Sidebar groups={navs} />

        {/* 3. MAIN CONTENT */}
        <main className="flex-1 flex flex-col relative z-10 min-w-0 bg-transparent">
          <Header />
          
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 scroll-smooth">
            {/* Outlet renders the child route content */}
            <Outlet />
          </div>
        </main>
        
      </div>
    </ProtectedLayout>
  );
};