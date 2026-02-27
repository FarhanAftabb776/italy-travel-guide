"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/cities", label: "Cities" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
    const pathname = usePathname();
    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link href="/" className="navbar-logo">
                    <div className="logo-icon">🚕</div>
                    <div className="logo-text">Italy<span>Taxi</span></div>
                </Link>

                <ul className="navbar-links">
                    {links.map((l) => (
                        <li key={l.href}>
                            <Link href={l.href} className={pathname === l.href ? "active" : ""}>
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <a href="tel:+390612345678" className="navbar-phone">
                        📞 +39 06 1234 5678
                    </a>
                    <Link href="/booking" className="btn btn-primary btn-sm">Book a Ride</Link>
                </div>
            </div>
        </nav>
    );
}
