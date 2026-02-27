import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";

const services = [
  {
    icon: "✈️",
    title: "Airport Transfers",
    desc: "Seamless pickups and drop-offs at all major Italian airports. Flight tracking included.",
    features: ["All major airports covered", "Flight delay monitoring", "Meet & greet service", "Fixed prices, no surprises"],
  },
  {
    icon: "🏨",
    title: "Hotel Transfers",
    desc: "Door-to-door service between hotels, resorts, and any accommodation across Italy.",
    features: ["All hotels & resorts", "24/7 availability", "Luggage assistance", "Professional drivers"],
  },
  {
    icon: "🏛️",
    title: "Tourist Destinations",
    desc: "Visit the Colosseum, Vatican, Uffizi Gallery, Pompeii and all iconic Italian landmarks.",
    features: ["Colosseum & Vatican", "Museums & galleries", "Flexible wait times", "Local driver insight"],
  },
  {
    icon: "🗺️",
    title: "Full Day Tours",
    desc: "Custom itineraries across cities and regions. Explore Italy at your own pace.",
    features: ["Custom routes", "Multiple stops", "8–12 hour packages", "Photography stops"],
  },
];

const cities = [
  { name: "Rome", desc: "Eternal City", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop" },
  { name: "Milan", desc: "Fashion Capital", img: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=600&h=400&fit=crop" },
  { name: "Florence", desc: "Cradle of Renaissance", img: "https://images.unsplash.com/photo-1541416616-acffb63c2de4?w=600&h=400&fit=crop" },
  { name: "Venice", desc: "City of Canals", img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=400&fit=crop" },
  { name: "Naples", desc: "Gateway to Amalfi", img: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=600&h=400&fit=crop" },
  { name: "Amalfi Coast", desc: "Scenic Coastal Drive", img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=400&fit=crop" },
];

const testimonials = [
  { name: "Sarah K.", country: "🇺🇸 United States", text: "Absolutely incredible service! Our driver Marco was waiting at FCO with a sign, helped with all luggage, and gave us amazing tips about Rome. Will book again!", stars: 5 },
  { name: "James T.", country: "🇬🇧 United Kingdom", text: "Used ItalyTaxi for transfers between Florence and Venice. Comfortable car, punctual driver, and the price was exactly as quoted online. Highly recommend!", stars: 5 },
  { name: "Aiko M.", country: "🇯🇵 Japan", text: "As a first-time visitor to Italy, I was nervous about getting around. ItalyTaxi made everything so easy. Even had a driver who spoke some Japanese!", stars: 5 },
];

const whyFeatures = [
  { icon: "🛡️", title: "Safe & Licensed", desc: "All drivers are fully licensed, background-checked, and insured for your peace of mind." },
  { icon: "💬", title: "English Speaking Drivers", desc: "Our multilingual drivers speak English, Spanish, French and more – no language barriers." },
  { icon: "⏱️", title: "Always On Time", desc: "We track flights and monitor traffic to ensure you're never kept waiting." },
  { icon: "💳", title: "Fixed Transparent Pricing", desc: "No hidden fees or surge pricing. The price you see is the price you pay." },
  { icon: "🚗", title: "Premium Vehicle Fleet", desc: "Mercedes, BMW and luxury minibus options for individuals, families and groups." },
  { icon: "📱", title: "24/7 Support", desc: "Round-the-clock customer support via WhatsApp, phone, and email." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-content container">
          <div className="hero-grid">
            {/* Left: Text */}
            <div>
              <p className="hero-eyebrow animate-fade-up">Premium Italian Taxi Service</p>
              <h1 className="hero-title animate-fade-up delay-1">
                Travel Italy with <span className="highlight">Comfort</span> & Confidence
              </h1>
              <p className="hero-subtitle animate-fade-up delay-2">
                Airport transfers, hotel pickups, tourist destinations, and full-day tours — trusted by thousands of international visitors across Italy.
              </p>
              <div className="hero-actions animate-fade-up delay-3">
                <Link href="/booking" className="btn btn-primary btn-lg">Book Your Ride →</Link>
                <Link href="/services" className="btn btn-secondary btn-lg">Explore Services</Link>
              </div>
              <div className="hero-trust animate-fade-up delay-4">
                {[
                  { number: "15,000+", label: "Trips Completed" },
                  { number: "4.9★", label: "Average Rating" },
                  { number: "20+", label: "Italian Cities" },
                  { number: "24/7", label: "Available" },
                ].map((t, i) => (
                  <Fragment key={t.label}>
                    {i > 0 && <div className="trust-divider" />}
                    <div className="trust-item">
                      <span className="trust-number">{t.number}</span>
                      <span className="trust-label">{t.label}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>

            {/* Right: Booking Card */}
            <div className="animate-fade-up delay-2">
              <div className="booking-card">
                <div className="booking-card-header">
                  <h3>🚕 Quick Booking</h3>
                  <p>Get an instant quote for your journey</p>
                </div>
                <div className="booking-form">
                  <div className="form-group">
                    <label className="form-label">Pickup Location</label>
                    <input className="form-input" type="text" placeholder="e.g. Rome Fiumicino Airport" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Destination</label>
                    <input className="form-input" type="text" placeholder="e.g. Hotel Eden, Rome" />
                  </div>
                  <div className="booking-form-row">
                    <div className="form-group">
                      <label className="form-label">Date</label>
                      <input className="form-input" type="date" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Passengers</label>
                      <select className="form-input">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n}>{n} Passenger{n > 1 ? "s" : ""}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Service Type</label>
                    <select className="form-input">
                      <option>Airport Transfer</option>
                      <option>Hotel Transfer</option>
                      <option>Tourist Destination</option>
                      <option>Full Day Tour</option>
                      <option>City-to-City</option>
                    </select>
                  </div>
                  <Link href="/booking" className="btn btn-primary" style={{ marginTop: 8 }}>
                    Get Instant Quote →
                  </Link>
                  <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    ✓ Fixed price · ✓ No hidden fees · ✓ Free cancellation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {[
              { number: "15,000+", label: "Trips Completed" },
              { number: "20+", label: "Italian Cities Served" },
              { number: "4.9/5", label: "Customer Rating" },
              { number: "8+", label: "Years of Experience" },
            ].map((s) => (
              <div key={s.label} className="stat-item">
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">✦ Our Services</span>
            <h2 className="display-lg">Everything You Need <br /><span className="text-gold">to Explore Italy</span></h2>
            <p>From the moment you land to every sightseeing adventure — we have you covered with premium taxi services.</p>
          </div>
          <div className="services-grid">
            {services.map((s) => (
              <div key={s.title} className="service-card">
                <div className="service-icon"><span>{s.icon}</span></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="feature-list">
                  {s.features.map((f) => (
                    <div key={f} className="feature-item">
                      <span className="feature-check">✓</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/services" className="btn btn-outline btn-lg">View All Services →</Link>
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="section" style={{ background: "var(--bg-secondary)", paddingTop: "100px" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">🇮🇹 Destinations</span>
            <h2 className="display-lg">We Cover All of <span className="text-gold">Italy</span></h2>
            <p>From the bustling streets of Rome to the romantic canals of Venice — wherever you want to go, we take you there.</p>
          </div>
          <div className="cities-grid">
            {cities.map((c) => (
              <Link href="/cities" key={c.name} className="city-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.name} className="city-img" />
                <div className="city-overlay" />
                <div className="city-content">
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                  <span className="city-tag">Book Transfer →</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/cities" className="btn btn-outline btn-lg">View All Cities →</Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="container">
          <div className="why-grid">
            <div>
              <span className="section-badge">✦ Why ItalyTaxi</span>
              <h2 className="display-lg" style={{ marginBottom: 16 }}>
                The <span className="text-gold">Trusted Choice</span> <br />for Tourists in Italy
              </h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: 40, lineHeight: 1.7 }}>
                We understand the challenges of traveling in a foreign country. That's why we've built a service that puts your safety, comfort, and convenience first.
              </p>
              <div className="why-features">
                {whyFeatures.map((f) => (
                  <div key={f.title} className="why-feature">
                    <div className="why-icon">{f.icon}</div>
                    <div className="why-text">
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="why-visual">
              <div style={{ fontSize: "5rem", marginBottom: 24, animation: "float 4s ease-in-out infinite" }}>🚕</div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginBottom: 12 }}>
                Italy's Most Trusted <span style={{ color: "var(--gold)" }}>Taxi Service</span>
              </h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.7 }}>
                Over 8 years of taking international tourists safely across Italy. Join 15,000+ happy travelers.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
                {[["🇺🇸", "USA"], ["🇬🇧", "UK"], ["🇩🇪", "Germany"], ["🇯🇵", "Japan"]].map(([flag, country]) => (
                  <div key={country} style={{ padding: "12px 16px", background: "var(--gold-dim)", borderRadius: "var(--r-md)", border: "1px solid var(--border-gold)", fontSize: "0.9rem" }}>
                    {flag} {country} Tourists
                  </div>
                ))}
              </div>
              <Link href="/booking" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Book Your Taxi Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">⭐ Reviews</span>
            <h2 className="display-lg">What <span className="text-gold">Tourists Say</span></h2>
            <p>Don't just take our word for it — here's what international travelers say about ItalyTaxi.</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-stars">{"⭐".repeat(t.stars)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-country">{t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to Explore Italy?</h2>
            <p>Book your premium taxi transfer today and travel with total peace of mind.</p>
            <div className="cta-actions">
              <Link href="/booking" className="btn btn-dark btn-lg">Book Now →</Link>
              <a href="tel:+390612345678" className="btn btn-lg" style={{ background: "rgba(0,0,0,0.15)", color: "#000", border: "2px solid rgba(0,0,0,0.2)" }}>
                📞 Call Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
