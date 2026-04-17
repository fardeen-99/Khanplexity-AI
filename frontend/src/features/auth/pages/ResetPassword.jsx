import { useState } from "react";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";
import { useSelector } from "react-redux";
import { Sparkles, Eye, EyeOff } from "lucide-react";
import { useToast } from "../../../contexts/ToastContext";
import Particles from "@/components/Particles";

const ResetPassword = () => {
    const { loading } = useSelector((state) => state.auth);
    const { showToast } = useToast();
    const location = useLocation();
    const email = location.state?.email;

    const [form, setform] = useState({
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const { handleResetPassword } = useAuth();
    const navigate = useNavigate();

    const handleform = (e) => {
        const { name, value } = e.target;
        setform((prev) => ({ ...prev, [name]: value }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        
        if (form.password.length < 8) {
            showToast("Password must be at least 8 characters.", "error");
            return;
        }

        if (form.password !== form.confirmPassword) {
            showToast("Passwords do not match.", "error");
            return;
        }

        try {
            await handleResetPassword(form.password, email);
            showToast("Password changed successfully", "success");
            navigate("/login");
        } catch (error) {
            showToast(error.message || "Failed to reset password", "error");
        }
    };

    if (!email) {
        return <Navigate to="/forgot-password" />;
    }

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
                        Reset Password
                    </h1>
                    <p className="text-on-surface-variant text-sm font-medium tracking-wide uppercase opacity-70">
                        Create a secure new password
                    </p>
                </div>

                <div className="glass-card rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                    <form onSubmit={handlesubmit} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold tracking-[0.05em] uppercase text-on-surface-variant ml-1">
                                New Password
                            </label>
                            <div className="relative group/input">
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleform}
                                    placeholder="••••••••"
                                    className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface py-4 px-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-outline/50 font-body"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold tracking-[0.05em] uppercase text-on-surface-variant ml-1">
                                Confirm Password
                            </label>
                            <div className="relative group/input">
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleform}
                                    placeholder="••••••••"
                                    className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface py-4 px-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-outline/50 font-body"
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full tonal-pulse text-on-primary font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(197,199,200,0.1)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn disabled:opacity-70 disabled:pointer-events-none"
                        >
                            <span>{loading ? "Resetting..." : "Reset Password"}</span>
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ResetPassword;
