import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services – ItalyTaxi",
    description: "Explore all ItalyTaxi services: airport transfers, hotel pickups, tourist spots, full-day tours, and city-to-city transfers across Italy.",
};

const services = [
    {
        icon: "✈️",
        title: "Airport Transfers",
        subtitle: "Arrivals & Departures",
        desc: "Start and end your Italian adventure stress-free. We monitor your flight in real-time and adjust for any delays. Our driver will be waiting in the arrivals hall with a name board, ready to assist with your luggage.",
        features: ["Rome FCO & CIA airports", "Milan MXP & LIN airports", "Florence, Venice, Naples airports", "Flight delay monitoring", "Meet & greet in arrivals hall", "Fixed price – no meter surprises", "Baby seats available on request"],
        airports: ["Rome Fiumicino (FCO)", "Rome Ciampino (CIA)", "Milan Malpensa (MXP)", "Florence (FLR)", "Venice Marco Polo (VCE)", "Naples (NAP)"],
        price: "From €35",
        color: "rgba(212,175,55,0.08)",
    },
    {
        icon: "🏨",
        title: "Hotel & Accommodation Transfers",
        subtitle: "Door-to-Door Comfort",
        desc: "Whether you're checking into a 5-star hotel in central Rome or a countryside villa in Tuscany, we'll take you exactly where you need to go — comfortably and punctually.",
        features: ["All hotels, B&Bs, Airbnbs & villas", "Early morning & late night pickups", "Multiple bag assistance", "Child & baby seat options", "Luxury vehicle upgrades available", "Group minibus options (up to 16 pax)", "Return transfers bookable in advance"],
        airports: [],
        price: "From €25",
        color: "rgba(0,146,70,0.06)",
    },
    {
        icon: "🏛️",
        title: "Tourist Destination Transfers",
        subtitle: "See Italy's Iconic Landmarks",
        desc: "Get dropped right at the entrance of Italy's most iconic attractions. Our knowledgeable drivers can suggest the best times to visit and provide local tips to enhance your experience.",
        features: ["Colosseum & Roman Forum", "Vatican Museums & Sistine Chapel", "Pompeii & Herculaneum", "Uffizi Gallery, Florence", "Leaning Tower of Pisa", "Amalfi Coast viewpoints", "Lake Como & Garda day trips"],
        airports: [],
        price: "From €30",
        color: "rgba(200,16,46,0.05)",
    },
    {
        icon: "🗺️",
        title: "Full Day Tours",
        subtitle: "Custom Itineraries",
        desc: "Have your own private chauffeur for the entire day. Design your perfect Italian itinerary and we'll handle the driving so you can focus on soaking in the beauty around you.",
        features: ["8 to 12 hour packages", "Fully custom route planning", "Multiple city or site stops", "Photography-optimised stops", "Restaurant recommendations", "Driver acts as local guide", "Fully air-conditioned luxury vehicles"],
        airports: [],
        price: "From €280/day",
        color: "rgba(212,175,55,0.06)",
    },
    {
        icon: "🚌",
        title: "City-to-City Transfers",
        subtitle: "Intercity Travel Made Easy",
        desc: "Avoid crowded trains and confusing bus routes. Travel between Italian cities in total comfort. Our drivers know every route and can take scenic detours on request.",
        features: ["Rome ↔ Florence (3hr journey)", "Florence ↔ Venice (3.5hr journey)", "Rome ↔ Naples (2.5hr journey)", "Milan ↔ Venice (3hr journey)", "All major city pairs covered", "Scenic route options available", "Multiple stops along the route"],
        airports: [],
        price: "From €150",
        color: "rgba(0,146,70,0.05)",
    },
    {
        icon: "🎩",
        title: "Private Chauffeur Service",
        subtitle: "Ultimate Luxury Travel",
        desc: "For those who want nothing less than the best. Our executive chauffeur service offers a fleet of premium Mercedes and BMW vehicles with immaculately dressed, professional drivers.",
        features: ["Mercedes E/S-Class & BMW 7 Series", "Suited, professional chauffeur", "Complimentary water & refreshments", "Wi-Fi hotspot in vehicle", "Newspaper & local guide on board", "Corporate billing available", "Hourly, half-day, or full-day hire"],
        airports: [],
        price: "From €80/hr",
        color: "rgba(212,175,55,0.1)",
    },
];

export default function ServicesPage() {
    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="page-hero-orb" style={{ width: 500, height: 500, background: "rgba(212,175,55,0.07)", top: -200, right: -100 }} />
                <div className="container">
                    <div className="page-hero-content">
                        <span className="section-badge">✦ What We Offer</span>
                        <h1>Premium Taxi <span className="text-gold">Services</span></h1>
                        <p>From airport arrivals to full-day sightseeing adventures — every journey covered with comfort, safety and professionalism.</p>
                    </div>
                </div>
            </section>

            {/* Services Detail */}
            <section className="section">
                <div className="container">
                    <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
                        {services.map((s, i) => (
                            <div key={s.title} style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "3fr 2fr" : "2fr 3fr", gap: 60, alignItems: "center" }}>
                                {i % 2 === 1 && (
                                    <div style={{ background: s.color, border: "1px solid var(--border-gold)", borderRadius: "var(--r-xl)", padding: 48, textAlign: "center" }}>
                                        <div style={{ fontSize: "6rem", marginBottom: 24 }}>{s.icon}</div>
                                        <div style={{ background: "var(--gold-dim)", border: "1px solid var(--border-gold)", borderRadius: "var(--r-lg)", padding: "20px 28px", display: "inline-block" }}>
                                            <div className="price-from">Starting from</div>
                                            <div className="price-amount">{s.price}</div>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <span className="section-badge">{s.icon} {s.subtitle}</span>
                                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700, margin: "16px 0", lineHeight: 1.2 }}>
                                        {s.title}
                                    </h2>
                                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 32 }}>{s.desc}</p>
                                    <div className="feature-list" style={{ marginBottom: 32 }}>
                                        {s.features.map((f) => (
                                            <div key={f} className="feature-item">
                                                <span className="feature-check">✓</span> {f}
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                                        <Link href="/booking" className="btn btn-primary">Book This Service →</Link>
                                        {i % 2 === 1 && <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Fixed price · Free cancellation</span>}
                                    </div>
                                </div>
                                {i % 2 === 0 && (
                                    <div style={{ background: s.color, border: "1px solid var(--border-gold)", borderRadius: "var(--r-xl)", padding: 48, textAlign: "center" }}>
                                        <div style={{ fontSize: "6rem", marginBottom: 24 }}>{s.icon}</div>
                                        <div style={{ background: "var(--gold-dim)", border: "1px solid var(--border-gold)", borderRadius: "var(--r-lg)", padding: "20px 28px", display: "inline-block" }}>
                                            <div className="price-from">Starting from</div>
                                            <div className="price-amount">{s.price}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-sm">
                <div className="container">
                    <div className="cta-banner">
                        <h2>Ready to Book Your Transfer?</h2>
                        <p>Get an instant fixed-price quote. No hidden fees, no surprises.</p>
                        <div className="cta-actions">
                            <Link href="/booking" className="btn btn-dark btn-lg">Get a Quote →</Link>
                            <a href="tel:+390612345678" className="btn btn-lg" style={{ background: "rgba(0,0,0,0.15)", color: "#000", border: "2px solid rgba(0,0,0,0.2)" }}>📞 Call Us</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
