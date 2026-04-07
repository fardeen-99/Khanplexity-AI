import React from 'react';
import { motion } from 'framer-motion';

import orbImage from './images/generated-1775600459524.png';
import landscapeImage from './images/generated-1775600677532.png';
import Navbar from '@/features/home/pages/Navbar';

export default function AiPage() {
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
            <div className="flex flex-col w-full items-center">
                {/* Layer 1: Hero Viewport Area */}
                <div className="flex flex-col gap-20 mt-40  w-full max-w-[1440px] h-auto min-h-[1024px] relative">

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
                        className="flex flex-col items-center md:px-[64px] gap-[40px] z-10"
                    >
                        {/* The Brown Glowing Element */}
                        <div className="relative w-[160px] h-[160px] rounded-full shadow-[0px_20px_60px_rgba(168,85,247,0.25)] flex items-center justify-center">
                            {/* Using exact image and pure rendering without blend-modes that wash it out */}
                            <img
                                src={orbImage}
                                alt="Organic Aura"
                                className="w-full h-full rounded-full object-cover shadow-inner"
                            />
                            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none"></div>
                        </div>

                        <h1 className="text-[50px] md:text-[92px] leading-[1.15] whitespace-pre-wrap md:whitespace-nowrap font-bold tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 text-center "
                        style={{fontFamily:"'Alexandria', serif"}}
                        
                        >
                            Think deeper Create faster.
                            {/* <br />
                            <span className='text-[96px] md:text-[102px] leading-[1.05] whitespace-nowrap font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 text-center ' style={{fontFamily:"'Alexandria', serif"}}>Khanplexity</span> */}
                        </h1>
                        {/* <h1 className='text-[96px] md:text-[102px] leading-[1.05] whitespace-nowrap font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 text-center ' style={{fontFamily:"'Alexandria', serif"}}>Khanplexity</h1> */}

                        <p className="text-[20px] md:text-[22px]  px-[26px] font-light leading-[1.6] text-[#A1A1AA] text-center max-w-[600px]">
                            Meet Khanplexity—an AI that feels less like a machine, and more like a collaborator.
                        </p>
                    </motion.div>

                    {/* Launcher Footer Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center px-[64px] pb-[80px] z-20"
                    >
                        <div className="flex items-center justify-between w-full max-w-[680px] h-[72px] rounded-[36px] bg-white/5 border border-white/10 pl-[32px] pr-[8px] py-[8px] shadow-[0px_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                            <input
                                type="text"
                                placeholder="What are we working on today?"
                                className="bg-transparent border-none outline-none text-[18px] text-white placeholder:text-white/50 flex-1 font-light"
                            />
                            <button className="h-[56px] px-[32px] rounded-[28px] bg-white hover:bg-zinc-200 transition-colors duration-300 flex items-center justify-center shrink-0 ml-[16px] shadow-sm cursor-pointer">
                                <span className="text-[16px] text-black font-semibold leading-none">Start</span>
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>

            <div className="flex flex-col items-center w-full z-10 relative">
                {/* Section 01: Intelligence */}
                <section className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1440px] px-[64px] lg:px-[120px] py-[120px] gap-[80px]">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-[28px] w-full lg:w-[500px] shrink-0"
                    >
                        <div
                            className="text-[13px] tracking-[0.2em] text-[#A855F7] font-medium uppercase"
                            style={{ fontFamily: "'Geist Mono', monospace" }}
                        >
                            01 — Intelligence
                        </div>
                        <h2 className="text-[48px] font-light tracking-[-0.03em] text-white leading-[1.1] w-full lg:max-w-[500px]">
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
                        className="relative w-full lg:w-[700px] h-[400px] lg:h-[600px] rounded-[24px] overflow-hidden shadow-[0px_30px_80px_rgba(0,0,0,0.6)] ring-1 ring-white/5"
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
                <section className="flex flex-col items-center w-full max-w-[1440px] px-[64px] lg:px-[120px] pt-[80px] pb-[160px] gap-[100px]">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[40px] lg:text-[56px] font-light tracking-[-0.04em] text-white text-center"
                    >
                        Unprecedented depth.
                    </motion.h2>

                    <div className="flex flex-col lg:flex-row w-full gap-[64px] lg:gap-[40px]">
                        {/* Col 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col gap-[16px] flex-1"
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
                            className="flex flex-col gap-[16px] flex-1"
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
                            className="flex flex-col gap-[16px] flex-1"
                        >
                            <h3 className="text-[20px] font-medium text-white tracking-[-0.01em]">Context Memory</h3>
                            <p className="text-[16px] text-[#A1A1AA] leading-[1.7] font-light">
                                Never repeats mistakes. Learns user preferences over time. Adheres rigorously to specific codebase conventions without prompting.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="flex w-full items-center justify-center border-t border-white/5 bg-[#07070a]">
                    <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-[1440px] px-[64px] py-[40px] gap-6">
                        <div className="text-[14px] text-[#A1A1AA] font-light tracking-wide">
                            Khanplexity © 2026. All rights reserved.
                        </div>
                        <div className="flex gap-[32px]">
                            <a href="#" className="text-[14px] text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors duration-300 font-light">Privacy</a>
                            <a href="#" className="text-[14px] text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors duration-300 font-light">Terms</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
