import React from 'react';
import { motion } from 'framer-motion';

import orbImage from './images/generated-1775600459524.png';
import landscapeImage from './images/generated-1775600677532.png';
import Navbar from '@/features/home/pages/Navbar';
import Particles from '@/features/home/components/Particles';
import { useNavigate } from 'react-router-dom';

export default function AiPage() {
    const navigate = useNavigate();
    return (
        <div
            className="w-full flex-col font-sans overflow-x-hidden text-white min-h-screen selection:bg-[#A855F7]/30 antialiased"
            style={{
                background: 'radial-gradient(100% 100% at 50% 10%, #2a1728 0%, #07070a 100%)',
                backgroundColor: '#07070a',
                fontFamily: "'Alexandria', sans-serif"
            }}
        >

            <Navbar/>
            <div className="flex flex-col w-full items-center relative">



                {/* Layer 1: Hero Viewport Area */}
                <div className="flex flex-col gap-[40px] md:gap-20 mt-[140px] md:mt-40 w-full max-w-[1440px]  relative px-[24px] md:px-[64px] ">

                    {/* Navigation */}
                    {/* <nav className="flex items-center justify-between w-full px-[64px] py-[32px] z-20">
                        <div className="text-[22px] font-semibold text-[#FFFFFF] tracking-[-1px]">
                            Khanplexity
                        </div>
                        <div className="flex items-center gap-[40px]">
                            <a href="#" className="text-[13px] text-[#A1A1AA] hover:text-white transition-colors duration-300">Vision</a>
                            <a href="#" className="text-[13px] text-[#A1A1AA] hover:text-white transition-colors duration-300">Capabilities</a>
                            <a href="#" className="text-[14px] text-[#FFFFFF] font-medium hover:text-[#A855F7] transition-colors duration-300">Log in</a>
                        </div>
                    </nav> */}

                    {/* Hero Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center gap-[32px] md:gap-[40px] z-10 w-full"
                    >
                        {/* The Brown Glowing Element */}
                        <div className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full shadow-[0px_20px_60px_rgba(168,85,247,0.25)] flex items-center justify-center">
                            {/* Using exact image and pure rendering without blend-modes that wash it out */}
                            <img
                                src={orbImage}
                                alt="Organic Aura"
                                className=" w-full h-full rounded-full object-cover shadow-inner"
                            />
                            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none"></div>
                        </div>

                        <h1 className="text-[40px] sm:text-[54px] md:text-[80px] lg:text-[100px] leading-[1.1] whitespace-pre-wrap font-bold tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-r from-[#F9A8D4] via-[#A855F7] to-white text-center pb-2 w-full"
                        style={{fontFamily:"'Alexandria', serif"}}
                        
                        >
                            Think deeper Create faster.
                        </h1>

                        <p className="text-[16px] md:text-[22px] px-[16px] md:px-[26px] font-light leading-[1.6] text-[#A1A1AA] text-center max-w-[600px] w-full">
                            Meet Khanplexity—an AI that feels less like a machine, and more like a collaborator.
                        </p>
                    </motion.div>

                    {/* Launcher Footer Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center w-full z-20 mt-[-10px] md:mt-0"
                    >
                        <div className="flex items-center justify-between w-full max-w-[680px] h-[64px] md:h-[72px] rounded-[32px] md:rounded-[36px] bg-white/5 border border-white/10 pl-[24px] md:pl-[32px] pr-[6px] md:pr-[8px] py-[6px] md:py-[8px] shadow-[0px_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                            <input
                                type="text"
                                placeholder="What are we working on today?"
                                className="bg-transparent border-none outline-none text-[15px] md:text-[18px] text-white placeholder:text-white/50 flex-1 font-light w-full min-w-0"
                            />
                            <button 
                            onClick={()=>{navigate("/login")}}
                            className="h-[52px] md:h-[56px] px-[24px] md:px-[32px] rounded-[26px] md:rounded-[28px] bg-white hover:bg-zinc-200 transition-colors duration-300 flex items-center justify-center shrink-0 ml-[12px] md:ml-[16px] shadow-sm cursor-pointer">
                                <span className="text-[14px] md:text-[16px] text-black font-semibold leading-none">Start</span>
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>

            <div className="flex flex-col items-center w-full z-10 relative">
                {/* Workspace UI Mockup */}
                <section className="hidden lg:flex flex-col items-center w-full max-w-[1440px] px-[24px] md:px-[64px] lg:px-[120px] pt-35 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden lg:flex flex-col w-full max-w-[1040px] rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-[64px] shadow-[0px_30px_80px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        {/* Top Bar */}
                        <div className="flex items-center justify-between w-full px-[16px] md:px-[32px]  md:py-[20px] border-b border-white/10">
                            <span className="text-white text-[12px] sm:text-[14px] md:text-[16px] font-medium tracking-wide">Workspace: Khanplexity Interface</span>
                            <span className="text-[#F9A8D4] text-[10px] md:text-[14px] flex items-center gap-[6px] shrink-0">
                                <span className="w-[6px] h-[6px] md:w-[8px] md:h-[8px] rounded-full bg-[#F9A8D4] animate-pulse"></span>
                                Active Engine
                            </span>
                        </div>

                        {/* Chat Area */}
                        <div className="flex flex-col w-full px-[24px] md:px-[40px] py-[40px] gap-[32px]">
                            {/* AI Message */}
                            <div className="flex gap-[16px] md:gap-[20px] w-full max-w-[800px]">
                                <div className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] shrink-0 rounded-full bg-[#A855F7] flex items-center justify-center">
                                    <span className="text-white text-[18px] md:text-[20px] font-bold">K</span>
                                </div>
                                <div className="flex flex-col w-full p-[20px] md:p-[24px] rounded-[20px] bg-white/5 border border-white/10 gap-[16px]">
                                    <p className="text-white text-[14px] md:text-[16px] leading-[1.6]">
                                        I've analyzed the current design system. To improve structural intelligence, I recommend introducing a frosted glass component layer here.
                                    </p>
                                    <div className="flex flex-col w-full p-[20px] md:p-[24px] rounded-[12px] bg-black/40 border border-white/10 overflow-x-auto">
                                        <pre className="text-[#F9A8D4] text-[12px] md:text-[14px] leading-[1.5]" style={{ fontFamily: "'Geist Mono', monospace" }}>
{`function initGlassmorphism() {
  return {
    backdropFilter: 'blur(40px)',
    backgroundColor: 'rgba(255,255,255,0.05)'
  };
}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            {/* User Message */}
                            <div className="flex gap-[16px] md:gap-[20px] w-full justify-end">
                                <div className="flex flex-col p-[16px] md:p-[24px] rounded-[20px] bg-[#A855F7]/20 border border-[#A855F7]/40">
                                    <p className="text-white text-[14px] md:text-[16px] leading-[1.6]">
                                        That looks perfect. Deploy these components.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
                {/* Section 01: Intelligence */}
                <section className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1440px] px-[24px] md:px-[64px] lg:px-[120px] gap-[48px] lg:gap-[80px] pt-[90px]">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-[20px] md:gap-[28px] w-full lg:w-[500px] shrink-0"
                    >
                        <div
                            className="text-[13px] tracking-[0.2em] pl-2 text-[#A855F7] font-medium uppercase"
                            style={{ fontFamily: "'Geist Mono', monospace" }}
                        >
                            01 — Intelligence
                        </div>
                        <h2 className="text-[32px] md:text-[36px] lg:text-[48px] font-light tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-[#F9A8D4] via-[#A855F7] to-white leading-[1.1] w-full lg:max-w-[500px] pb-1">
                            Contextual brilliance in every interaction.
                        </h2>
                        <p className="text-[18px] text-[#A1A1AA] leading-[1.7] font-light w-full lg:max-w-[500px]">
                            Unlike traditional chatbots, Khanplexity holds a deep situational awareness.
                            It synthesizes complex repositories and design systems into clear, actionable logic.
                            The machine finally speaks human.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full lg:w-[700px] h-[300px] md:h-[350px] lg:h-[500px] rounded-[24px] overflow-hidden shadow-[0px_30px_80px_rgba(0,0,0,0.6)] ring-1 ring-white/5 "
                    >
                        <img
                            src={landscapeImage}
                            alt="Cinematic Abstract Landscape"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a]/80 via-transparent to-transparent pointer-events-none"></div>
                    </motion.div>
                </section>

                {/* Section 02: Capabilities Grid */}
                <section className="flex flex-col items-center w-full max-w-[1440px] px-[24px] md:px-[64px] lg:px-[120px] pt-[64px] pb-[80px] lg:pb-[160px] gap-[48px] lg:gap-[100px]">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[32px] md:text-[40px] lg:text-[56px] font-light tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-white text-center pb-1"
                    >
                        Unprecedented depth.
                    </motion.h2>

                    <div className="flex flex-col lg:flex-row w-full gap-[24px] lg:gap-[40px]">
                        {/* Col 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col gap-[16px] flex-1 p-[32px] md:p-[40px] rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-[40px]"
                        >
                            <h3 className="text-[20px] font-medium text-white tracking-[-0.01em]">Architectural Insight</h3>
                            <p className="text-[16px] text-[#A1A1AA] leading-[1.7] font-light">
                                Capable of reading across thousands of files simultaneously to understand not just what your code does, but how the overarching system behaves.
                            </p>
                        </motion.div>

                        {/* Col 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col gap-[16px] flex-1 p-[32px] md:p-[40px] rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-[40px]"
                        >
                            <h3 className="text-[20px] font-medium text-white tracking-[-0.01em]">Creative Execution</h3>
                            <p className="text-[16px] text-[#A1A1AA] leading-[1.7] font-light">
                                Bridges the gap between raw engineering and aesthetic design. Outputs rich layouts, generates styles, and perfectly balances form and function.
                            </p>
                        </motion.div>

                        {/* Col 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col gap-[16px] flex-1 p-[32px] md:p-[40px] rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-[40px]"
                        >
                            <h3 className="text-[20px] font-medium text-white tracking-[-0.01em]">Context Memory</h3>
                            <p className="text-[16px] text-[#A1A1AA] leading-[1.7] font-light">
                                Never repeats mistakes. Learns user preferences over time. Adheres rigorously to specific codebase conventions without prompting.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="flex w-full items-center justify-center bg-[#0c090e73] mt-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1440px] px-[24px] md:px-[63px] py-[24px] md:py-[26px] gap-3 text-center md:text-left">
                        <div className="text-[12px] md:text-[14px] text-[#A1A1AA] font-light tracking-wide">
                            Khanplexity © 2026. All rights reserved.
                        </div>
                        <div className="md:flex hidden gap-[24px] md:gap-[32px] justify-center w-full md:w-auto">
                            <a href="#" className="text-[12px] md:text-[14px] text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors duration-300 font-light">Privacy</a>
                            <a href="#" className="text-[12px] md:text-[14px] text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors duration-300 font-light">Terms</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
