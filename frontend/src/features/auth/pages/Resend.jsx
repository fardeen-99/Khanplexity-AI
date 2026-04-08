import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Mail, ChevronRight, Loader2, CheckCircle2 } from "lucide-react";
import { resend } from "../services/auth.service";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/auth.hook";
import { useToast } from "../../../contexts/ToastContext";
import Particles from "@/features/home/components/Particles";


const Resend = () => {

    const {showToast}=useToast()
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();

    const loading=useSelector((state)=>state.auth.loading)
   
const {handleResend}=useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await handleResend(email)
            setEmail("")
         
            setSuccessMsg("Verification email sent successfully!");
 showToast("Verification email sent successfully!", "success");
       
        }catch(error){
          
                       showToast(error.message || "Resend failed", "error");
                   
        }
    
    };

    return (
        <div className="bg-[#0e0e12] text-[#e6e4f3] min-h-screen selection:bg-primary/30 selection:text-on-surface flex flex-col items-center justify-center obsidian-gradient relative z-0 overflow-hidden pb-10">
            {/* TopAppBar */}
            <header className="fixed top-0 w-full z-50 bg-[#0B0B0F]/80 backdrop-blur-md flex items-center justify-between px-6 h-16 border-b border-outline-variant/10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate("/")} className="text-gray-300 cursor-pointer hover:opacity-80 transition-opacity scale-95 duration-200">
                        <ArrowLeft size={24} />
                    </button>
                    <span className="text-xl font-black tracking-tighter text-[#e6e4f3] font-headline uppercase">Khanplexity</span>
                </div>
                <div className="hidden md:flex gap-8">
                    <Link to="/login" className="text-[#aba9b8] font-body tracking-tight font-bold text-sm hover:text-white transition-colors">Login</Link>
                    <Link to="/signup" className="text-[#aba9b8] font-body tracking-tight font-bold text-sm hover:text-white transition-colors">Register</Link>
                </div>
            </header>
             
<div style={{ width: '100%', height: '100%',backgroundColor:"black", position: 'absolute',top:0,left:0,zIndex:1 }}>
  <Particles
    particleColors={["#ffffff"]}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover
    alphaParticles={false}
    disableRotation={false}
    pixelRatio={1}
/>
</div>

            <main className="w-full max-w-[480px] px-6 z-10 animate-fade-in flex flex-col items-center pt-20">

                {/* Header Section */}
                <div className="text-center mb-10 w-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-container-high mb-6 ghost-border">
                        <Mail className="text-primary" size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface mb-3 font-headline">Verify Your Email</h1>
                    <p className="text-on-surface-variant text-lg font-body leading-relaxed max-w-sm mx-auto">
                        We need to confirm your identity. Enter your email to receive a new verification link.
                    </p>
                </div>

                {/* Resend Form Card */}
                <div className="w-full glass-card p-8 md:p-10 rounded-[2.5rem] ghost-border shadow-[0_-4px_40px_rgba(230,228,243,0.04)] relative overflow-hidden group">
                    {/* Subtle internal ambient light */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 blur-[80px] rounded-full"></div>

                    {successMsg ? (
                        <div className="text-center py-4 animate-fade-in">
                            <div className="flex justify-center mb-4">
                                <CheckCircle2 className="text-green-400" size={48} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Check your inbox</h2>
                            <p className="text-on-surface-variant mb-8">{successMsg}</p>
                            <Link 
                               onClick={()=>setSuccessMsg("")}
                                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline decoration-primary/40 underline-offset-4 transition-all"
                            >
                                Again Resend Email <ChevronRight size={18} />
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="space-y-3">
                                <label className="block text-xs uppercase tracking-[0.1em] font-bold text-on-surface-variant font-label px-1">Email Address</label>
                                <div className="relative">
                                    <input
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="alex@khanplexity.ai"
                                        className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50 transition-all placeholder:text-outline/40 font-body text-lg"
                                    />
                                </div>
                            </div>

                            {errorMsg && (
                                <p className="text-error text-sm font-semibold px-1 animate-fade-in flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-error"></span> {errorMsg}
                                </p>
                            )}

                            <button
                                disabled={loading || !email}
                                type="submit"
                                className="w-full tonal-pulse text-on-primary font-bold py-5 rounded-2xl shadow-[0_0_30px_rgba(197,199,200,0.1)] hover:brightness-110 active:scale-[0.98] transition-all font-headline tracking-tight text-xl disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3 group"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={24} />
                                ) : (
                                    <>
                                        Send Link
                                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* Footer Navigation */}
                <div className="mt-8 text-center animate-fade-in delay-200">
                    <Link to="/login" className="text-on-surface-variant font-body text-sm hover:text-on-surface transition-colors flex items-center justify-center gap-2">
                        <ArrowLeft size={14} /> Back to Login
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Resend;
