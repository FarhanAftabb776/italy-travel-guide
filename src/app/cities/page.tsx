import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Italian Cities – ItalyTaxi",
    description: "Taxi and transfer services across all major Italian cities — Rome, Milan, Florence, Venice, Naples, Amalfi Coast and more.",
};

const cities = [
    {
        name: "Rome",
        region: "Lazio",
        img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=500&fit=crop",
        desc: "The Eternal City is overflowing with history, art and culture. From the Colosseum to the Trevi Fountain, Vatican to Trastevere — Rome demands to be explored.",
        highlights: ["Colosseum & Roman Forum", "Vatican Museums", "Trevi Fountain", "Pantheon", "Borghese Gallery", "Trastevere neighbourhood"],
        airports: ["Fiumicino (FCO)", "Ciampino (CIA)"],
        fromPrice: "€35",
        travelTip: "Traffic in central Rome can be heavy. Book your taxi in advance and allow extra time during peak hours.",
    },
    {
        name: "Milan",
        region: "Lombardy",
        img: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800&h=500&fit=crop",
        desc: "Italy's fashion and finance capital. Home to Leonardo da Vinci's Last Supper, the magnificent Duomo, and the world's finest shopping districts.",
        highlights: ["Duomo di Milano", "The Last Supper", "Galleria Vittorio Emanuele II", "Brera Art Gallery", "Navigli district", "Fashion Quadrilateral"],
        airports: ["Malpensa (MXP)", "Linate (LIN)", "Bergamo (BGY)"],
        fromPrice: "€45",
        travelTip: "Milan has three airports. Make sure to book the correct one — Malpensa is furthest from the city centre.",
    },
    {
        name: "Florence",
        region: "Tuscany",
        img: "https://images.unsplash.com/photo-1541416616-acffb63c2de4?w=800&h=500&fit=crop",
        desc: "The cradle of the Renaissance. Florence's streets are an open-air museum, home to Michelangelo's David, Botticelli's Birth of Venus, and iconic ponte views.",
        highlights: ["Uffizi Gallery", "Piazzale Michelangelo", "Ponte Vecchio", "Duomo & Baptistery", "Pitti Palace", "Tuscany countryside tours"],
        airports: ["Florence Peretola (FLR)"],
        fromPrice: "€35",
        travelTip: "Florence's historic centre is ZTL restricted. Our drivers know exactly where they can drop you — right at the entrance to your destination.",
    },
    {
        name: "Venice",
        region: "Veneto",
        img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=500&fit=crop",
        desc: "The floating city unlike any other. Venice's labyrinthine canals, ornate palazzos and gondola-lined waterways create a surreal and romantic atmosphere.",
        highlights: ["St. Mark's Basilica", "Doge's Palace", "Grand Canal", "Rialto Bridge", "Murano & Burano islands", "Gondola rides"],
        airports: ["Venice Marco Polo (VCE)", "Treviso (TSF)"],
        fromPrice: "€50",
        travelTip: "Taxis drop off at Piazzale Roma — the gateway to Venice. From here, water taxis and vaporettos connect you to the islands.",
    },
    {
        name: "Naples",
        region: "Campania",
        img: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=800&h=500&fit=crop",
        desc: "Vibrant, chaotic and utterly captivating. Naples is the gateway to Pompeii, Herculaneum, Mount Vesuvius, and the stunning Amalfi Coast.",
        highlights: ["Pompeii & Herculaneum", "Mount Vesuvius", "Spaccanapoli street", "National Archaeological Museum", "Amalfi Coast day trips", "Best pizza in the world"],
        airports: ["Naples Capodichino (NAP)"],
        fromPrice: "€30",
        travelTip: "Naples is the perfect base for day trips to Pompeii and the Amalfi Coast. Book a full-day tour from Naples to maximise your time.",
    },
    {
        name: "Amalfi Coast",
        region: "Campania",
        img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=500&fit=crop",
        desc: "One of the world's most breathtaking coastal stretches. Dramatic cliffs, turquoise seas, lemon groves and colourful fishing villages cascade into the Mediterranean.",
        highlights: ["Positano", "Ravello gardens", "Amalfi town", "Praiano", "Path of the Gods hike", "Scenic coastal drive"],
        airports: ["Naples Capodichino (NAP)"],
        fromPrice: "€90",
        travelTip: "The Amalfi Coast road is narrow and winding. A private taxi is the best way to enjoy the scenery without the stress of driving.",
    },
    {
        name: "Turin",
        region: "Piedmont",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
        desc: "Elegant, sophisticated, and underrated. Turin is famous for its baroque architecture, Egyptian Museum, the Holy Shroud, and being the birthplace of Italian cinema.",
        highlights: ["Egyptian Museum", "Mole Antonelliana", "Royal Palace", "Valentino Park", "Porta Palazzo market", "Chocolate & Bicerin cafes"],
        airports: ["Turin Caselle (TRN)"],
        fromPrice: "€40",
        travelTip: "Turin is close to the Alps — it's perfect for a combined city and ski resort trip. Ask us about our mountain transfer packages.",
    },
    {
        name: "Bologna",
        region: "Emilia-Romagna",
        img: "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=800&h=500&fit=crop",
        desc: "Bologna the Red, the Fat and the Wise. Italy's food capital is home to the world's oldest university, incredible medieval towers, and the birthplace of tagliatelle al ragù.",
        highlights: ["Two Towers", "Piazza Maggiore", "Food markets & deli halls", "Oldest university (1088)", "Archiginnasio", "San Petronio Basilica"],
        airports: ["Bologna Guglielmo Marconi (BLQ)"],
        fromPrice: "€30",
        travelTip: "Bologna makes an excellent day trip from Florence (just 35 minutes by taxi) or a stop on a city-to-city transfer.",
    },
];

export default function CitiesPage() {
    return (
        <>
            <section className="page-hero">
                <div className="page-hero-orb" style={{ width: 600, height: 600, background: "rgba(212,175,55,0.06)", top: -200, right: -150 }} />
                <div className="container">
                    <div className="page-hero-content">
                        <span className="section-badge">🇮🇹 Destinations</span>
                        <h1>Cities We <span className="text-gold">Cover</span></h1>
                        <p>We provide premium taxi services in every major Italian city and region — from the Alps to Sicily, we have you covered.</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
                        {cities.map((city, i) => (
                            <div key={city.name} style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr", gap: 60, alignItems: "start" }}>
                                {/* Image */}
                                <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                                    <div style={{ borderRadius: "var(--r-xl)", overflow: "hidden", position: "relative", height: 360 }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={city.img} alt={city.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)", borderRadius: "var(--r-sm)", padding: "8px 14px", display: "flex", flexDirection: "column" }}>
                                            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Region</span>
                                            <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>{city.region}</span>
                                        </div>
                                        <div style={{ position: "absolute", bottom: 16, right: 16, background: "var(--gold)", color: "#000", borderRadius: "var(--r-sm)", padding: "8px 16px", fontWeight: 700, fontSize: "0.9rem" }}>
                                            From {city.fromPrice}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", fontWeight: 700, marginBottom: 16 }}>
                                        {city.name}
                                    </h2>
                                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 28 }}>{city.desc}</p>

                                    <div style={{ marginBottom: 28 }}>
                                        <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
                                            Top Attractions
                                        </h4>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                            {city.highlights.map((h) => (
                                                <div key={h} className="feature-item">
                                                    <span className="feature-check">📍</span> {h}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: 28, padding: "16px 20px", background: "rgba(212,175,55,0.06)", border: "1px solid var(--border-gold)", borderRadius: "var(--r-md)" }}>
                                        <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                                            ✈️ Airports Served
                                        </h4>
                                        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{city.airports.join(" · ")}</p>
                                    </div>

                                    <div style={{ marginBottom: 32, padding: "16px 20px", background: "rgba(0,0,0,0.2)", borderRadius: "var(--r-md)", borderLeft: "3px solid var(--gold)" }}>
                                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em" }}>💡 Travel Tip</span>
                                        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: 6, lineHeight: 1.6 }}>{city.travelTip}</p>
                                    </div>

                                    <Link href="/booking" className="btn btn-primary">Book Transfer to {city.name} →</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-sm">
                <div className="container">
                    <div className="cta-banner">
                        <h2>Your City Not Listed?</h2>
                        <p>We cover all of Italy. Contact us for a custom quote to any destination.</p>
                        <div className="cta-actions">
                            <a href="tel:+390612345678" className="btn btn-dark btn-lg">📞 Call for Custom Route</a>
                            <Link href="/booking" className="btn btn-lg" style={{ background: "rgba(0,0,0,0.15)", color: "#000", border: "2px solid rgba(0,0,0,0.2)" }}>Book Online →</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
