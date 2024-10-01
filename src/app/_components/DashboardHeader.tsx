"use client"

import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function DashboardHeader() {
    const currentPath = usePathname();
  return (
    <>
        <div className="dashboardContentHeader flex items-center justify-between py-4 px-5 border-b border-solid border-slate-300">
            <h1 className="font-semibold text-raisin-black text-[28px] md:text-[32px]">
                {currentPath === "/user/dashboard" ? "Dashboard" : currentPath === "/user/myapplications" ? "My Applications" : currentPath === "/user/myprofile" ? "My Profile" : currentPath === "/company/joblisting" ? "Job Listing" : currentPath === "/company/applicants" ? "All Applicants" : currentPath === "/company/postajob" ? "Post a Job" : currentPath === "/company/profile" ? "Company Profile" : currentPath === "/company/applicants/details" ? "Applicant Details" : "Page"}
            </h1>
            <Link href={"/"} className="hidden md:block border border-steel-blue border-solid text-steel-blue py-2 px-3 rounded transition hover:bg-steel-blue hover:text-white d-block">
                Back to Home
            </Link>
        </div>
    </>
  )
}
