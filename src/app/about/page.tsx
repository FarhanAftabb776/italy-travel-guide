import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us – ItalyTaxi",
    description: "Learn about ItalyTaxi — Italy's trusted taxi service for international tourists. Our story, mission, values, and team.",
};

const team = [
    { name: "Marco Rossi", role: "Founder & CEO", icon: "👨‍💼", desc: "Born in Rome, Marco has spent 20 years in the tourism and transport industry shaping ItalyTaxi into what it is today." },
    { name: "Sofia Bianchi", role: "Operations Manager", icon: "👩‍💼", desc: "Sofia ensures every booking runs smoothly. She coordinates our driver network across Italy with military precision." },
    { name: "Luca Ferrari", role: "Head Driver — Rome", icon: "🚗", desc: "With 12 years on Roman roads, Luca knows every shortcut, scenic route, and piazza in the Eternal City." },
    { name: "Elena Conti", role: "Customer Experience", icon: "🎧", desc: "Elena leads our multilingual support team, ensuring every tourist — regardless of language — gets help 24/7." },
];

const values = [
    { icon: "🤝", title: "Trust", desc: "We build lasting relationships with our passengers. Your safety and satisfaction are never compromised." },
    { icon: "⭐", title: "Excellence", desc: "We hold ourselves to the highest standards — punctuality, cleanliness, professionalism, always." },
    { icon: "🌍", title: "Inclusivity", desc: "We serve tourists from every corner of the globe. Language, culture, and background — we embrace all." },
    { icon: "♻️", title: "Sustainability", desc: "We're transitioning our fleet to hybrid and electric vehicles to protect Italy's natural beauty for future generations." },
];

export default function AboutPage() {
    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="page-hero-orb" style={{ width: 500, height: 500, background: "rgba(212,175,55,0.07)", top: -150, right: -100 }} />
                <div className="page-hero-orb" style={{ width: 300, height: 300, background: "rgba(200,16,46,0.05)", bottom: 0, left: -50 }} />
                <div className="container">
                    <div className="page-hero-content">
                        <span className="section-badge">✦ Our Story</span>
                        <h1>About <span className="text-gold">ItalyTaxi</span></h1>
                        <p>A passionate Italian team dedicated to making your journey across Italy as beautiful as the destination itself.</p>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="section">
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
                        <div>
                            <span className="section-badge">📖 Our Story</span>
                            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.4rem", fontWeight: 700, margin: "16px 0 24px", lineHeight: 1.2 }}>
                                Born in Rome, <span className="text-gold">Built for Tourists</span>
                            </h2>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 20 }}>
                                ItalyTaxi was founded in 2016 by Marco Rossi, a Roman native who noticed how many international tourists struggled to navigate Italy's transport systems. Lost in translation, overcharged by unlicensed taxis, or stranded after missed trains — tourists deserved better.
                            </p>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 20 }}>
                                Starting with just three cars and a passion for hospitality, Marco built a service around the needs of international travellers. English-speaking drivers, fixed prices, flight tracking, and 24/7 support became the pillars of the ItalyTaxi promise.
                            </p>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 40 }}>
                                Today, we operate a fleet of 120+ vehicles across 20+ Italian cities, having completed over 15,000 journeys for tourists from more than 60 countries. But our mission remains as personal as it was on day one: <strong style={{ color: "var(--text-primary)" }}>make every tourist feel at home in Italy.</strong>
                            </p>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                                {[{ n: "2016", l: "Founded" }, { n: "120+", l: "Vehicles" }, { n: "60+", l: "Countries Served" }].map((s) => (
                                    <div key={s.l} style={{ textAlign: "center", padding: "20px 12px", background: "var(--gold-dim)", border: "1px solid var(--border-gold)", borderRadius: "var(--r-md)" }}>
                                        <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--gold)", lineHeight: 1 }}>{s.n}</div>
                                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ background: "var(--grad-card)", border: "1px solid var(--border-gold)", borderRadius: "var(--r-xl)", padding: 48, textAlign: "center" }}>
                            <div style={{ fontSize: "6rem", marginBottom: 24 }}>🇮🇹</div>
                            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginBottom: 16 }}>
                                Our <span className="text-gold">Mission</span>
                            </h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 32 }}>
                                To be the most trusted, reliable, and welcoming taxi service for international tourists travelling across Italy — ensuring every journey is safe, comfortable, and memorable.
                            </p>
                            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "var(--r-md)", padding: "20px 24px", borderLeft: "4px solid var(--gold)" }}>
                                <p style={{ fontStyle: "italic", color: "var(--text-primary)", lineHeight: 1.7, fontSize: "1.05rem" }}>
                                    "Italy is the most beautiful country in the world. Our job is to make sure you see all of it — safely, comfortably, and with a smile."
                                </p>
                                <p style={{ marginTop: 12, fontSize: "0.85rem", color: "var(--gold)", fontWeight: 600 }}>— Marco Rossi, Founder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section" style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">💎 Our Values</span>
                        <h2 className="display-lg">What We <span className="text-gold">Stand For</span></h2>
                        <p>These core values guide everything we do — from how we hire our drivers to how we interact with every passenger.</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
                        {values.map((v) => (
                            <div key={v.title} className="service-card">
                                <div className="service-icon"><span>{v.icon}</span></div>
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">👥 Meet the Team</span>
                        <h2 className="display-lg">The People Behind <span className="text-gold">ItalyTaxi</span></h2>
                        <p>Our team of passionate Italians and travel professionals are dedicated to making your trip unforgettable.</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28 }}>
                        {team.map((m) => (
                            <div key={m.name} className="testimonial-card" style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "4rem", marginBottom: 16 }}>{m.icon}</div>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 4 }}>{m.name}</h3>
                                <p style={{ fontSize: "0.8rem", color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>{m.role}</p>
                                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fleet */}
            <section className="section" style={{ background: "var(--bg-secondary)" }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">🚗 Our Fleet</span>
                        <h2 className="display-lg">Premium Vehicles <span className="text-gold">For Every Need</span></h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                        {[
                            { icon: "🚗", type: "Standard Saloon", capacity: "1–3 passengers", vehicle: "Toyota Camry / VW Passat", price: "From €25" },
                            { icon: "🚙", type: "Executive Saloon", capacity: "1–3 passengers", vehicle: "Mercedes E-Class / BMW 5", price: "From €55" },
                            { icon: "🚐", type: "MPV / People Carrier", capacity: "4–7 passengers", vehicle: "Mercedes Vito / VW Sharan", price: "From €65" },
                            { icon: "🚌", type: "Minibus", capacity: "8–16 passengers", vehicle: "Mercedes Sprinter", price: "From €120" },
                        ].map((v) => (
                            <div key={v.type} className="info-card" style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "3rem", marginBottom: 16 }}>{v.icon}</div>
                                <h4 style={{ fontWeight: 700, marginBottom: 6 }}>{v.type}</h4>
                                <p style={{ fontSize: "0.82rem", color: "var(--gold)", marginBottom: 8 }}>👤 {v.capacity}</p>
                                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: 16 }}>{v.vehicle}</p>
                                <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--gold)" }}>{v.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-sm">
                <div className="container">
                    <div className="cta-banner">
                        <h2>Travel Italy with Us</h2>
                        <p>Join 15,000+ satisfied tourists who've made ItalyTaxi their trusted travel partner.</p>
                        <div className="cta-actions">
                            <Link href="/booking" className="btn btn-dark btn-lg">Book Your Ride →</Link>
                            <Link href="/services" className="btn btn-lg" style={{ background: "rgba(0,0,0,0.15)", color: "#000", border: "2px solid rgba(0,0,0,0.2)" }}>Our Services</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
