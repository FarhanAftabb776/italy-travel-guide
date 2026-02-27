"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const services = ["Airport Transfer", "Hotel Transfer", "Tourist Destination Tour", "Full Day Tour", "City-to-City Transfer", "Private Chauffeur"];
const passengers = ["1 Passenger", "2 Passengers", "3 Passengers", "4 Passengers", "5 Passengers", "6 Passengers", "7–8 Passengers (MPV)", "9–16 Passengers (Minibus)"];
const vehicles = ["Standard Saloon (1–3 pax)", "Executive Saloon (1–3 pax)", "MPV / People Carrier (4–7 pax)", "Minibus (8–16 pax)"];

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        service: "", pickup: "", destination: "", date: "", time: "",
        passengers: "", vehicle: "", name: "", email: "", phone: "",
        flightNumber: "", notes: "", returnTrip: false,
    });

    const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const { error: supabaseError } = await supabase
                .from('bookings')
                .insert([{
                    service: form.service,
                    pickup: form.pickup,
                    destination: form.destination,
                    date: form.date,
                    time: form.time,
                    flight_number: form.flightNumber || null,
                    return_trip: form.returnTrip,
                    passengers: form.passengers,
                    vehicle: form.vehicle,
                    notes: form.notes || null,
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    status: 'pending'
                }]);

            if (supabaseError) throw supabaseError;

            // Trigger Email Automation
            try {
                await fetch('/api/notify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'new_booking',
                        booking: {
                            ...form,
                            return_trip: form.returnTrip // Normalize for the email template
                        }
                    })
                });
            } catch (emailErr) {
                console.error("Email notification failed:", emailErr);
            }

            setSubmitted(true);
        } catch (err: any) {
            console.error("Booking submission error:", err);
            setError(err.message || "An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <>
                <section className="page-hero" style={{ minHeight: "60vh" }}>
                    <div className="container">
                        <div className="page-hero-content" style={{ paddingTop: 40 }}>
                            <div style={{ fontSize: "5rem", marginBottom: 24 }}>🎉</div>
                            <h1>Booking <span className="text-gold">Confirmed!</span></h1>
                            <p>Thank you, {form.name || "traveller"}! We've received your booking request and will send a confirmation to {form.email || "your email"} within 15 minutes.</p>
                            <div style={{ display: "flex", gap: 16, marginTop: 40, justifyContent: "center" }}>
                                <Link href="/" className="btn btn-primary btn-lg">Back to Home</Link>
                                <Link href="/faq" className="btn btn-secondary btn-lg">Read FAQs</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-orb" style={{ width: 500, height: 500, background: "rgba(212,175,55,0.07)", top: -150, right: -100 }} />
                <div className="container">
                    <div className="page-hero-content">
                        <span className="section-badge">🚕 Reserve Your Ride</span>
                        <h1>Book Your <span className="text-gold">Italian Taxi</span></h1>
                        <p>Complete the form below for a fixed-price, confirmed booking. No hidden fees. Instant confirmation.</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ maxWidth: 760, margin: "0 auto" }}>

                        {/* Progress Bar */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 48 }}>
                            {[
                                { n: 1, label: "Journey Details" },
                                { n: 2, label: "Vehicle & Options" },
                                { n: 3, label: "Personal Details" },
                            ].map((s) => (
                                <div key={s.n} style={{ textAlign: "center" }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: "50%",
                                        background: step >= s.n ? "var(--gold)" : "var(--bg-card)",
                                        border: `2px solid ${step >= s.n ? "var(--gold)" : "var(--border-subtle)"}`,
                                        color: step >= s.n ? "#000" : "var(--text-muted)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontWeight: 700, fontSize: "1rem", margin: "0 auto 10px",
                                        transition: "var(--t-base)",
                                    }}>{s.n}</div>
                                    <div style={{ fontSize: "0.8rem", color: step >= s.n ? "var(--gold)" : "var(--text-muted)", fontWeight: step === s.n ? 700 : 400 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div style={{ background: "rgba(255,0,0,0.1)", color: "#ff4444", padding: 16, borderRadius: "var(--r-md)", marginBottom: 24, border: "1px solid rgba(255,0,0,0.2)", textAlign: "center" }}>
                                ⚠️ {error}
                            </div>
                        )}

                        {/* Step 1 */}
                        {step === 1 && (
                            <div className="booking-card">
                                <div className="booking-card-header">
                                    <h3>✈️ Journey Details</h3>
                                    <p>Tell us where you're going and when</p>
                                </div>
                                <div className="booking-form">
                                    <div className="form-group">
                                        <label className="form-label">Service Type *</label>
                                        <select className="form-input" value={form.service} onChange={e => set("service", e.target.value)} required>
                                            <option value="">Select a service...</option>
                                            {services.map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Pickup Location *</label>
                                        <input className="form-input" type="text" placeholder="e.g. Rome Fiumicino Airport (FCO)" value={form.pickup} onChange={e => set("pickup", e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Destination *</label>
                                        <input className="form-input" type="text" placeholder="e.g. Hotel de Russie, Rome" value={form.destination} onChange={e => set("destination", e.target.value)} />
                                    </div>
                                    <div className="booking-form-row">
                                        <div className="form-group">
                                            <label className="form-label">Date *</label>
                                            <input className="form-input" type="date" value={form.date} onChange={e => set("date", e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Time *</label>
                                            <input className="form-input" type="time" value={form.time} onChange={e => set("time", e.target.value)} />
                                        </div>
                                    </div>
                                    {(form.service === "Airport Transfer") && (
                                        <div className="form-group">
                                            <label className="form-label">Flight Number (optional — for tracking)</label>
                                            <input className="form-input" type="text" placeholder="e.g. BA254" value={form.flightNumber} onChange={e => set("flightNumber", e.target.value)} />
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label className="form-label">Return Trip?</label>
                                        <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                                            {["No, one way", "Yes, I need a return"].map(opt => (
                                                <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "10px 16px", border: `1px solid ${form.returnTrip === (opt.startsWith("Yes")) ? "var(--gold)" : "var(--border-subtle)"}`, borderRadius: "var(--r-md)", background: form.returnTrip === (opt.startsWith("Yes")) ? "var(--gold-dim)" : "transparent", transition: "var(--t-fast)", fontSize: "0.9rem" }}>
                                                    <input type="radio" name="returnTrip" style={{ accentColor: "var(--gold)" }} checked={form.returnTrip === opt.startsWith("Yes")} onChange={() => set("returnTrip", opt.startsWith("Yes"))} />
                                                    {opt}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => setStep(2)}>
                                        Next: Vehicle & Options →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                            <div className="booking-card">
                                <div className="booking-card-header">
                                    <h3>🚗 Vehicle & Passengers</h3>
                                    <p>Choose the right vehicle for your group</p>
                                </div>
                                <div className="booking-form">
                                    <div className="form-group">
                                        <label className="form-label">Number of Passengers *</label>
                                        <select className="form-input" value={form.passengers} onChange={e => set("passengers", e.target.value)}>
                                            <option value="">Select passengers...</option>
                                            {passengers.map(p => <option key={p}>{p}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Vehicle Type *</label>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
                                            {vehicles.map(v => (
                                                <label key={v} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", padding: "14px 18px", border: `1px solid ${form.vehicle === v ? "var(--gold)" : "var(--border-subtle)"}`, borderRadius: "var(--r-md)", background: form.vehicle === v ? "var(--gold-dim)" : "var(--bg-card)", transition: "var(--t-fast)", fontSize: "0.9rem" }}>
                                                    <input type="radio" name="vehicle" style={{ accentColor: "var(--gold)" }} checked={form.vehicle === v} onChange={() => set("vehicle", v)} />
                                                    {v}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Special Requests (optional)</label>
                                        <textarea className="form-input" rows={3} placeholder="e.g. baby seat required, large luggage, scenic route preferred..." value={form.notes} onChange={e => set("notes", e.target.value)} style={{ resize: "vertical" }} />
                                    </div>
                                    <div style={{ display: "flex", gap: 12 }}>
                                        <button className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
                                        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setStep(3)}>Next: Your Details →</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3 */}
                        {step === 3 && (
                            <div className="booking-card">
                                <div className="booking-card-header">
                                    <h3>👤 Your Personal Details</h3>
                                    <p>We'll send your confirmation here</p>
                                </div>
                                <div className="booking-form">
                                    <div className="booking-form-row">
                                        <div className="form-group">
                                            <label className="form-label">Full Name *</label>
                                            <input className="form-input" type="text" placeholder="John Smith" value={form.name} onChange={e => set("name", e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Email Address *</label>
                                            <input className="form-input" type="email" placeholder="john@email.com" value={form.email} onChange={e => set("email", e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone / WhatsApp Number *</label>
                                        <input className="form-input" type="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={e => set("phone", e.target.value)} />
                                    </div>

                                    {/* Summary */}
                                    <div style={{ background: "rgba(212,175,55,0.06)", border: "1px solid var(--border-gold)", borderRadius: "var(--r-lg)", padding: 24, marginTop: 8 }}>
                                        <h4 style={{ fontWeight: 700, marginBottom: 16, color: "var(--gold)" }}>📋 Booking Summary</h4>
                                        {[
                                            ["Service", form.service || "—"],
                                            ["From", form.pickup || "—"],
                                            ["To", form.destination || "—"],
                                            ["Date & Time", form.date && form.time ? `${form.date} at ${form.time}` : "—"],
                                            ["Passengers", form.passengers || "—"],
                                            ["Vehicle", form.vehicle || "—"],
                                        ].map(([label, val]) => (
                                            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border-subtle)", fontSize: "0.88rem" }}>
                                                <span style={{ color: "var(--text-muted)" }}>{label}</span>
                                                <span style={{ fontWeight: 500 }}>{val}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
                                        ✓ Fixed price confirmed on next step · ✓ Free cancellation 24h+ before pickup · ✓ Instant email confirmation
                                    </p>

                                    <div style={{ display: "flex", gap: 12 }}>
                                        <button className="btn btn-secondary" disabled={loading} onClick={() => setStep(2)}>← Back</button>
                                        <button className="btn btn-primary" id="submit-booking" style={{ flex: 1 }} onClick={handleSubmit} disabled={loading}>
                                            {loading ? "Submitting Request..." : "✓ Confirm Booking Request"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Reassurance */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 32 }}>
                            {[
                                { icon: "🔒", label: "Secure Booking", desc: "SSL encrypted & safe" },
                                { icon: "💰", label: "Fixed Price", desc: "No surprises at destination" },
                                { icon: "✅", label: "Free Cancellation", desc: "24h before your trip" },
                            ].map((r) => (
                                <div key={r.label} style={{ textAlign: "center", padding: "20px 12px", background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--r-md)" }}>
                                    <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{r.icon}</div>
                                    <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: 4 }}>{r.label}</div>
                                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{r.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
