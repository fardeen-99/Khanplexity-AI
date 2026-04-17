import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";
import { useSelector } from "react-redux";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useToast } from "../../../contexts/ToastContext";
import Particles from "@/components/Particles";

const ForgotPassword = () => {
    const { loading } = useSelector((state) => state.auth);
    const { showToast } = useToast();
    const [email, setEmail] = useState("");
    const { handleForgotPassword } = useAuth();
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            showToast("Please enter a valid email", "error");
            return;
        }

        try {
            await handleForgotPassword(email);
            showToast("OTP has been sent to your email.", "success");
            navigate("/verify-otp");
        } catch (error) {
            showToast(error.message || "Failed to send OTP", "error");
        }
    };

    return (
        <div className="bg-[#0B0B0F] text-on-surface min-h-screen flex flex-col items-center justify-center p-6 selection:bg-primary-container selection:text-white relative z-0">
            <div style={{ width: '100%', height: '100%',backgroundColor:"black", position: 'absolute',top:0,left:0,zIndex:-1 }}>
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

            <main className="w-full max-w-[450px] relative z-10 animate-fade-in">
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="mb-6 relative">
                        <div className="relative bg-surface-container-highest p-4 rounded-2xl shadow-2xl border border-outline-variant/20">
                            <Sparkles className="w-9 h-9 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface mb-2">
                        Forgot Password
                    </h1>
                    <p className="text-on-surface-variant text-sm font-medium tracking-wide uppercase opacity-70">
                        Enter your email to receive an OTP
                    </p>
                </div>

                <div className="glass-card rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                    <form onSubmit={handlesubmit} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold tracking-[0.05em] uppercase text-on-surface-variant ml-1">
                                Email Address
                            </label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="curator@khanplexity.ai"
                                className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface py-4 px-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-outline/50 font-body"
                            />
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full tonal-pulse text-on-primary font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(197,199,200,0.1)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn disabled:opacity-70 disabled:pointer-events-none"
                        >
                            <span>{loading ? "Sending OTP..." : "Send OTP"}</span>
                        </button>

                        <div className="mt-4 text-center">
                            <p className="text-on-surface-variant text-sm font-medium">
                                Remember your password?
                                <Link to="/login" className="text-primary font-bold hover:text-white hover:underline underline-offset-4 ml-1 transition-all">Back to login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ForgotPassword;
