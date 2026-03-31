import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate=useNavigate();
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 mx-auto transition-all duration-300 bg-black/40 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 flex items-center justify-center ">
                    <span className="text-xl font-black text-white italic">K</span>
                </div>
                <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">
                    Khan<span className="bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 bg-clip-text text-transparent italic uppercase">plexity</span>
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <button
                onClick={()=>navigate("/login")}
                className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                    Log in
                </button>
                <HoverBorderGradient onClick={()=>navigate("/signup")} className="text-sm active:scale-95">
                       Sign up
                    </HoverBorderGradient>
            </div>
        </nav>
    );
};

export default Navbar;