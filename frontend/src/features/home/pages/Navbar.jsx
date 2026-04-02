import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 mx-auto transition-all duration-300 bg-black/40 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center ">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center ">
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-white"
  >
    <path
      d="M22.3977 7.0896h-2.3106V0.0676l-7.5094 6.3542V0.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932 -6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657 -4.531v4.531h-5.355l5.355 -4.531zm-13.2862 0.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h0.0001v-2.6488l5.7763 -5.7764v7.0111l-5.7764 5.2993zm12.7086 0.0248 -5.7766 -5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882 -5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z"
      fill="currentColor"
    />
  </svg>
                </div>
                <p className="text-2xl font-bold  text-white capitalize">khanplexity</p>
                {/* <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">

                    Khan<span className="bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 bg-clip-text text-transparent italic uppercase">plexity</span>
                </h1> */}
            </div>

            <div className="flex items-center gap-6">
                <button
                    onClick={() => navigate("/login")}
                    className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                    Log in
                </button>
                <HoverBorderGradient onClick={() => navigate("/signup")} className="text-sm active:scale-95">
                    Sign up
                </HoverBorderGradient>
            </div>
        </nav>
    );
};

export default Navbar;