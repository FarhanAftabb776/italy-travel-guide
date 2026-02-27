import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="navbar-logo" style={{ marginBottom: 0 }}>
                            <div className="logo-icon">🚕</div>
                            <div className="logo-text">Italy<span>Taxi</span></div>
                        </Link>
                        <p className="footer-brand-desc">
                            Your trusted travel partner across Italy. Safe, comfortable, and reliable taxi services for international tourists — airports, hotels, monuments and beyond.
                        </p>
                        <div className="footer-socials">
                            {["𝕏", "f", "in", "📷"].map((s, i) => (
                                <a key={i} href="#" className="footer-social">{s}</a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h4>Services</h4>
                        <ul className="footer-links">
                            {["Airport Transfers", "Hotel Pickups", "Tourist Spots", "Full Day Tours", "City-to-City", "Private Chauffeur"].map((s) => (
                                <li key={s}><Link href="/services">{s}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Cities */}
                    <div className="footer-col">
                        <h4>Popular Cities</h4>
                        <ul className="footer-links">
                            {["Rome", "Milan", "Florence", "Venice", "Naples", "Amalfi Coast"].map((c) => (
                                <li key={c}><Link href="/cities">{c}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h4>Contact</h4>
                        <ul className="footer-links">
                            <li><a href="tel:+390612345678">📞 +39 06 1234 5678</a></li>
                            <li><a href="mailto:info@italytaxi.com">✉️ info@italytaxi.com</a></li>
                            <li><Link href="/admin/login" style={{ opacity: 0.5, fontSize: '0.75rem' }}>🔐 Staff Portal</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 ItalyTaxi v1.2. All rights reserved. Built for international travellers 🌍</p>
                    <div className="footer-flags">🇮🇹 🇬🇧 🇺🇸 🇩🇪 🇫🇷</div>
                    <div style={{ display: "flex", gap: 16 }}>
                        <Link href="#" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Privacy</Link>
                        <Link href="#" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
