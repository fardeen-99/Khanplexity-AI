import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
    return (
        <footer className="w-full py-4 px-6 border-t border-white/5 bg-black/50 backdrop-blur-md z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
                <div className="flex items-center gap-1">
                    <span>&copy; {new Date().getFullYear()}</span>
                    <span className="text-gray-400 font-bold uppercase tracking-widest italic">Khan<span className="text-indigo-400">plexity</span></span>
                </div>

                <div className="flex items-center gap-1">
                    <span>made with</span>
                    <Heart className="w-3 h-3 text-red-500 animate-pulse fill-red-500" />
                    <span>by</span>
                    <span className="text-indigo-400 font-bold">fardeen</span>
                </div>

                <div className="flex gap-4">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;