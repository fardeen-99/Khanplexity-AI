import React from "react";
import { Sparkles, MessageSquare, Code, Lightbulb, Zap, Shield, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Card } from "@/components/Style.component";

const Home = () => {
    const navigate = useNavigate();
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-stone-300 text-xs font-bold uppercase tracking-widest mb-8">
                    <Sparkles className="w-4 h-4" />
                    Intelligent Solutions for Everyone
                </div>

                <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-6 leading-tight">
                   Clarity for complex thinking<br />
                    <span className=" uppercase text-[wheat]">
                        KhanPlexity
                    </span>
                </h1>

                <p className=" text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                    The next generation of AI-driven productivity. Simple, fast, and elegantly designed for your most complex tasks.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                    <HoverBorderGradient onClick={() => navigate("/signup")} className="px-8  py-4.5  text-white font-bold active:scale-95">
                        Get Started for Free
                    </HoverBorderGradient>
                    <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-4xl hover:bg-white/10 transition-all backdrop-blur-sm">
                        View Documentation
                    </button>
                </div>
            </section>

            {/* Feature Grid with UI Polish */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative z-10">
                {features.map((feature, i) => (
                    <Card key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/8 hover:border-indigo-500/30 transition-all group cursor-default">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                            <feature.icon className={`w-6 h-6 ${feature.color}`} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{feature.label}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                    </Card>
                ))}
            </section>


        </main>
    );
};

export default Home;