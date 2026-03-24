import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";
import { useSelector } from "react-redux";
import { Sparkles, Eye, EyeOff, ArrowRight } from "lucide-react";

const Login = () => {
    const { user, loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);

    const [form, setform] = useState({
        email: "",
        password: ""
    });

    const { handlelogin } = useAuth();
    const navigate = useNavigate();

    const handleform = (e) => {
        const { name, value } = e.target;
        setform((prev) => ({ ...prev, [name]: value }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        await handlelogin(form);
        setform({ email: "", password: "" });
        navigate("/chat");
    };

    if (user) {
        return <Navigate to="/chat" />;
    }

    return (
        <div className="bg-[#0B0B0F] text-on-surface min-h-screen flex flex-col items-center justify-center p-6 selection:bg-primary-container selection:text-white relative z-0">
            <main className="w-full max-w-[480px] relative z-10 animate-fade-in">
                {/* Branding Section */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150"></div>
                        <div className="relative bg-surface-container-highest p-4 rounded-2xl shadow-2xl border border-outline-variant/20">
                            <Sparkles className="w-9 h-9 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface mb-2">
                        Khanplexity
                    </h1>
                    <p className="text-on-surface-variant text-sm font-medium tracking-wide uppercase opacity-70">
                        The Digital Curator
                    </p>
                </div>

                {/* Login Card */}
                <div className="glass-card rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                    {/* Subtle internal ambient light */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-[80px] rounded-full"></div>
                    
                    <form onSubmit={handlesubmit} className="space-y-6 relative z-10">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold tracking-[0.05em] uppercase text-on-surface-variant ml-1">
                                Email Address
                            </label>
                            <div className="relative group/input">
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleform}
                                    placeholder="curator@khanplexity.ai"
                                    className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface py-4 px-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-outline/50 font-body"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="block text-xs font-bold tracking-[0.05em] uppercase text-on-surface-variant">
                                    Password
                                </label>
                                {/* <a href="#" className="text-xs font-semibold text-primary/80 hover:text-primary transition-colors">
                                    Forgot password?
                                </a> */}
                            </div>
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

                        {/* CTA Button */}
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full tonal-pulse text-on-primary font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(197,199,200,0.1)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn disabled:opacity-70 disabled:pointer-events-none"
                        >
                            <span>{loading ? "Signing in..." : "Sign In to Curator"}</span>
                            {!loading && <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />}
                        </button>

                        {/* Divider */}
                        {/* <div className="flex items-center gap-4 py-2">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent"></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-outline">or continue with</span>
                            <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent"></div>
                        </div> */}

                        {/* Social Login */}
                        {/* <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="flex items-center justify-center gap-3 bg-surface-container-low border border-outline-variant/20 hover:bg-surface-container-high py-3.5 rounded-xl transition-all group/social">
                                <svg className="w-5 h-5 opacity-80 group-hover/social:opacity-100 transition-opacity" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-sm font-semibold">Google</span>
                            </button>
                            <button type="button" className="flex items-center justify-center gap-3 bg-surface-container-low border border-outline-variant/20 hover:bg-surface-container-high py-3.5 rounded-xl transition-all group/social">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 text-on-surface-variant group-hover/social:text-on-surface transition-colors">
                                    <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                                <span className="text-sm font-semibold">GitHub</span>
                            </button>
                        </div> */}

 <div className="mt-4 text-center">
                    <p className="text-on-surface-variant text-sm font-medium">
                        Don't have an account?
                        <Link to="/signup" className="text-primary font-bold hover:text-white hover:underline underline-offset-4 ml-1 transition-all">Create account</Link>
                    </p>
                </div>

                    </form>
                </div>

                {/* Secondary CTA */}
               
            </main>

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#0B0B0F]">
                <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[5%] right-[5%] w-[300px] h-[300px] bg-secondary-container/10 blur-[100px] rounded-full"></div>
            </div>
        </div>
    );
};

export default Login;