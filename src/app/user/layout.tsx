"use client";
import SidebarUser from "../_components/SidebarUser";
import DashboardHeader from "../_components/DashboardHeader";
import NavbarDashboard from "../_components/NavbarDashboard";

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
            <div className="dashboard bg-white flex flex-wrap min-h-screen relative">
                <NavbarDashboard/>
                <SidebarUser/>
                <div className="dashboardContent container w-full md:w-9/12 py-24 md:py-4">
                    <DashboardHeader/>
                    {children}
                </div>
            </div>
        </>
    )
  }