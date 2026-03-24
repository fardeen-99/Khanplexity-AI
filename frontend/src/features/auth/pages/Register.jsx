import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";

const Register = () => {
    const { user, loading } = useSelector((state) => state.auth);

    const [form, setform] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errorMsg, setErrorMsg] = useState("");

    const { handleregister } = useAuth();
    const navigate = useNavigate();

    const handleform = (e) => {
        const { name, value } = e.target;
        setform((prev) => ({ ...prev, [name]: value }));
        setErrorMsg("");
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        
        if (form.password !== form.confirmPassword) {
            setErrorMsg("Passwords do not match");
            return;
        }

        const submitForm = {
            username: form.username,
            email: form.email,
            password: form.password
        };

        await handleregister(submitForm);
        navigate("/chat");
    };

    if (user) {
        return <Navigate to="/chat" />;
    }

    return (
        <div className="bg-[#0e0e12] text-[#e6e4f3] min-h-screen selection:bg-primary/30 selection:text-on-surface flex flex-col items justify-center obsidian-gradient relative z-0">
            {/* TopAppBar */}
            <header className="fixed top-0 w-full z-50 bg-[#0B0B0F]/80 backdrop-blur-md flex items-center justify-between px-6 h-16 w-full border-b border-outline-variant/10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate("/")} className="text-gray-300 dark:text-[#e6e4f3] cursor-pointer hover:opacity-80 transition-opacity scale-95 transition-transform duration-200">
                        <ArrowLeft size={24} />
                    </button>
                    <span className="text-xl font-black tracking-tighter text-[#e6e4f3] font-headline uppercase">Khanplexity</span>
                </div>
                <div className="hidden md:flex gap-8">
                    <Link to="/login" className="text-[#aba9b8] font-body tracking-tight font-bold text-sm hover:opacity-80 transition-opacity">Login</Link>
                    <Link to="/signup" className="text-[#e6e4f3] font-body tracking-tight font-bold text-sm hover:opacity-80 transition-opacity">Register</Link>
                </div>
            </header>

            <main className="w-full h-full min-h-screen flex items-center justify-center px-4 relative overflow-hidden pt-20 pb-10">
                {/* Abstract Background Element */}
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-secondary-container/10 rounded-full blur-[100px] pointer-events-none"></div>
                
                <div className="w-full max-w-[480px] z-10 animate-fade-in">
                    {/* Header Section */}
                    <div className="text-center md:my-5 mb-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface mb-3 font-headline">Join the Collective</h1>
                        <p className="text-on-surface-variant text-lg font-body">Begin your journey as a digital curator.</p>
                    </div>

                    {/* Registration Form Card */}
                    <div className="bg-surface-container-low backdrop-blur-xl p-8 md:p-10 rounded-[2rem] ghost-border shadow-[0_-4px_40px_rgba(230,228,243,0.04)] relative overflow-hidden group">
                        {/* Subtle internal ambient light */}
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 blur-[80px] rounded-full"></div>

                        <form onSubmit={handlesubmit} className="space-y-6 relative z-10">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="block text-xs uppercase tracking-[0.05em] font-medium text-on-surface-variant font-label px-1">Full Name</label>
                                <div className="relative group">
                                    <input
                                        required
                                        name="username"
                                        value={form.username}
                                        onChange={handleform}
                                        type="text"
                                        placeholder="Alex Morgan"
                                        className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50 transition-all placeholder:text-outline/50 font-body"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="block text-xs uppercase tracking-[0.05em] font-medium text-on-surface-variant font-label px-1">Email Address</label>
                                <div className="relative group">
                                    <input
                                        required
                                        name="email"
                                        value={form.email}
                                        onChange={handleform}
                                        type="email"
                                        placeholder="alex@khanplexity.ai"
                                        className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50 transition-all placeholder:text-outline/50 font-body"
                                    />
                                </div>
                            </div>

                            {/* Passwords Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-xs uppercase tracking-[0.05em] font-medium text-on-surface-variant font-label px-1">Password</label>
                                    <input
                                        required
                                        name="password"
                                        value={form.password}
                                        onChange={handleform}
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50 transition-all placeholder:text-outline/50 font-body"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs uppercase tracking-[0.05em] font-medium text-on-surface-variant font-label px-1">Confirm Password</label>
                                    <input
                                        required
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleform}
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50 transition-all placeholder:text-outline/50 font-body"
                                    />
                                </div>
                            </div>
                            
                            {errorMsg && (
                                <p className="text-error text-xs font-semibold px-1 animate-fade-in">{errorMsg}</p>
                            )}

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full tonal-pulse text-on-primary font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(197,199,200,0.1)] hover:brightness-110 active:scale-[0.98] transition-all font-headline tracking-tight text-lg disabled:opacity-70 disabled:pointer-events-none"
                                >
                                    {loading ? "Creating..." : "Create Account"}
                                </button>
                            </div>
                        </form>

                        {/* Social Auth */}
                        {/* <div className="mt-8">
                            <div className="relative flex items-center justify-center mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-outline-variant/20"></div>
                                </div>
                                <span className="relative px-4 bg-surface-container-low text-xs uppercase tracking-[0.1em] text-on-surface-variant font-label">Or continue with</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" className="flex items-center justify-center gap-3 bg-surface-container-lowest/50 hover:bg-surface-container-highest border border-outline-variant/20 hover:border-outline-variant/40 rounded-xl py-3.5 transition-all group">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span className="text-sm font-medium text-on-surface">Google</span>
                                </button>
                                <button type="button" className="flex items-center justify-center gap-3 bg-surface-container-lowest/50 hover:bg-surface-container-highest border border-outline-variant/20 hover:border-outline-variant/40 rounded-xl py-3.5 transition-all group">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-on-surface opacity-80 group-hover:opacity-100 transition-opacity">
                                        <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                    <span className="text-sm font-medium text-on-surface">GitHub</span>
                                </button>
                            </div>
                        </div> */}

 <div className="mt-5 text-center ">
                        <p className="text-on-surface-variant font-body text-sm">
                            Already have an account?
                            <Link to="/login" className="text-on-surface font-semibold hover:text-primary hover:underline decoration-primary-dim/40 underline-offset-4 transition-all ml-1">Sign in</Link>
                        </p>
                    </div>

                    </div>

                    {/* Footer Link */}
                   
                </div>
            </main>
        </div>
    );
};

export default Register;