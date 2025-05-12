"use client";

import Sidebar from "@/components/dashboard/sidebar";
import React from "react";
// import type { Metadata } from "next";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
// export const metadata: Metadata = {
//   title: "SchedulePay | Dashboard",
//   description: "Manage your contractor payments",
// };

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="relative flex h-screen bg-gray-50">
      <div className="hidden lg:block lg:w-[280px] flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-auto">
        <div className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4">
          <button
            onClick={() =>
              document
                .querySelector(".mobile-sidebar")
                ?.classList.toggle("translate-x-0")
            }
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-6">{children}</div>
      </div>

      <div className="mobile-sidebar fixed inset-0 z-40 transform -translate-x-full transition-transform duration-300 ease-in-out lg:hidden">
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() =>
            document
              .querySelector(".mobile-sidebar")
              ?.classList.remove("translate-x-0")
          }
        ></div>
        <div className="relative h-full w-[280px] bg-white z-50">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
