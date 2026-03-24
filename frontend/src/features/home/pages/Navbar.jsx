import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate=useNavigate();
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 mx-auto transition-all duration-300 bg-black/40 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <span className="text-xl font-black text-white italic">K</span>
                </div>
                <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">
                    Khan<span className="text-indigo-400">plexity</span>
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <button
                onClick={()=>navigate("/login")}
                className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                    Log in
                </button>
                <button
                onClick={()=>navigate("/signup")}
                className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                    Sign up
                </button>
            </div>
        </nav>
    );
};

export default Navbar;