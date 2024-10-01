"use client"

import DashboardHeader from "../_components/DashboardHeader";
import NavbarDashboard from "../_components/NavbarDashboard";
import SidebarCompany from "../_components/SidebarCompany";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <style jsx global>{`
          .navbarMain {
              display: none;
          }
          .footer{
              display: none;
          }
      `}</style>
      <div className="dashboard bg-white flex min-h-screen">
          <NavbarDashboard/>
          <SidebarCompany/>
          <div className="dashboardContent container w-full md:w-9/12 py-24 md:py-4">
              <DashboardHeader/>
              {children}
          </div>
      </div>
    </>
  );
}
