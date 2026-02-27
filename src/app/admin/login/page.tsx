"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            // Use window.location for a full refresh to ensure middleware picks up the session cookie
            window.location.href = "/admin/dashboard";
        } catch (err: any) {
            setError(err.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--grad-bg)", padding: 24 }}>
            <div className="booking-card" style={{ maxWidth: 450, width: "100%" }}>
                <div className="booking-card-header" style={{ textAlign: "center" }}>
                    <div className="logo-icon" style={{ margin: "0 auto 16px", width: 48, height: 48, fontSize: "1.4rem" }}>🚕</div>
                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginBottom: 8 }}>Admin <span className="text-gold">Login</span></h2>
                    <p>Secure access for ItalyTaxi management</p>
                </div>

                <form onSubmit={handleLogin} className="booking-form">
                    {error && (
                        <div style={{ background: "rgba(255,0,0,0.1)", color: "#ff4444", padding: 12, borderRadius: "var(--r-md)", fontSize: "0.85rem", border: "1px solid rgba(255,0,0,0.2)", textAlign: "center" }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            className="form-input"
                            type="email"
                            placeholder="admin@italytaxi.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            className="form-input"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: "100%", marginTop: 12 }}
                        disabled={loading}
                    >
                        {loading ? "Authenticating..." : "Login to Dashboard"}
                    </button>

                    <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 16 }}>
                        Authorized personnel only. All access attempts are logged.
                    </p>
                </form>
            </div>
        </main>
    );
}
