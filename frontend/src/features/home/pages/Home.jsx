import React from "react";
import { Sparkles, MessageSquare, Code, Lightbulb, Zap, Shield, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate=useNavigate();
    const features = [
        { icon: MessageSquare, label: "Smart Analysis", color: "text-blue-400", desc: "Deep insights powered by advanced AI." },
        { icon: Code, label: "Code Generation", color: "text-purple-400", desc: "Write perfect code in seconds." },
        { icon: Lightbulb, label: "Creative Ideas", color: "text-yellow-400", desc: "Unlock your next big breakthrough." },
        { icon: Zap, label: "Instant Results", color: "text-emerald-400", desc: "Experience lightning-fast responses." }
    ];

    return (
        <main className="flex-1 flex flex-col items-center pt-32 pb-20 px-6 max-w-7xl mx-auto w-full overflow-hidden">
            {/* Subtle Hero Section */}
            <section className="text-center mb-24 animate-fade-in relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8">
                    <Sparkles className="w-4 h-4" />
                    Intelligent Solutions for Everyone
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                    Experience the Power of <br/>
                    <span className="bg-linear-to-r w-full from-indigo-400 to-purple-400 bg-clip-text text-transparent italic uppercase">KhanPlexity</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                    The next generation of AI-driven productivity. Simple, fast, and elegantly designed for your most complex tasks.
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <button onClick={()=>navigate("/signup")} className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 active:scale-95">
                        Get Started for Free
                    </button>
                    <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm">
                        View Documentation
                    </button>
                </div>
            </section>

            {/* Feature Grid with UI Polish */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative z-10">
                {features.map((feature, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/8 hover:border-indigo-500/30 transition-all group cursor-default">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                            <feature.icon className={`w-6 h-6 ${feature.color}`} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{feature.label}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </section>

            {/* Background Accent Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] -z-10 rounded-full pointer-events-none"></div>
        </main>
    );
};

export default Home;