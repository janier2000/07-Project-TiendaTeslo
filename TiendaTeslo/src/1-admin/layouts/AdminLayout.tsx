import { useState } from "react";
import { Outlet } from "react-router";
import { AdminSidebar } from "../../1-admin/components/AdminSidebar";
import { AdminHeader } from "../../1-admin/components/AdminHeader";

export function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="bg-gray-50 flex">
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
