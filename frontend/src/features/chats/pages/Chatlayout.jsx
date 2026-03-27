import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";

const Chatlayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden text-[#111] dark:text-[#EAEAEA] transition-colors duration-500 bg-transparent relative z-10">
      {/* Fixed Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Right content area — only this scrolls */}
      <div className="flex-1 bg-[#F9F9F9] dark:bg-[#0B0B0B] lg:ml-[260px] h-screen overflow-y-auto scrollbar-minimal flex flex-col">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[#E5E5E5] dark:border-[#1F1F1F] sticky top-0 z-20 bg-[#F5F5F7] dark:bg-[#0B0B0B] transition-colors duration-500">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#555] dark:text-[#888] hover:text-[#111] dark:hover:text-[#EAEAEA] transition-colors p-1"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-semibold text-[#111] dark:text-[#EAEAEA]">
            Khanplexity
          </span>
        </div>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default Chatlayout;
