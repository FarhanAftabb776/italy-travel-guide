"use client";
import { useState } from "react";
import Link from "next/link";

const faqs = [
    {
        q: "How do I book a taxi with ItalyTaxi?",
        a: "You can book easily through our website's booking form, by calling us at +39 06 1234 5678, or via WhatsApp. Simply provide your pickup location, destination, date, time and number of passengers, and we'll confirm your booking within minutes."
    },
    {
        q: "Are your prices fixed or does the meter run?",
        a: "All our prices are 100% fixed and confirmed at the time of booking. There are no hidden fees, no meter running, and no surge pricing. The price you receive in your quote is the final price you pay."
    },
    {
        q: "Do you track flight delays for airport pickups?",
        a: "Yes! We monitor all flight arrivals in real-time. If your flight is delayed, your driver will automatically adjust their arrival time. You'll never be left waiting and you'll never be charged extra for delays."
    },
    {
        q: "What languages do your drivers speak?",
        a: "All our drivers speak fluent English. Many also speak Spanish, French, German, and other languages. We're a service designed specifically for international tourists, so language barriers are never an issue."
    },
    {
        q: "How early should I book my taxi?",
        a: "We recommend booking at least 24 hours in advance to guarantee availability, especially during peak tourist season (June–September). However, we do accept last-minute bookings subject to availability. For early morning airport pickups, always book in advance."
    },
    {
        q: "Can I book a return transfer at the same time?",
        a: "Absolutely! You can book your outward and return journeys at the same time and receive a discount on the combined booking. Just select 'Round Trip' when filling out the booking form."
    },
    {
        q: "What type of vehicles do you have?",
        a: "Our fleet includes saloon cars (up to 3 passengers + luggage), estate/MPV vehicles (up to 6 passengers), minibuses (up to 8 passengers), and large minibuses (up to 16 passengers). All are modern, air-conditioned, and professionally maintained. Executive Mercedes and BMW options are also available."
    },
    {
        q: "Do you provide baby seats or child seats?",
        a: "Yes, we can provide baby seats and child booster seats free of charge upon request. Please mention this when booking so we can ensure the correct seat is fitted before your journey."
    },
    {
        q: "What is your cancellation policy?",
        a: "Cancellations made more than 24 hours before the scheduled pickup time are completely free of charge. Cancellations within 24 hours may incur a small fee. No-shows are charged the full amount. Please contact us as early as possible if your plans change."
    },
    {
        q: "Can I pay by card or only cash?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, bank transfer, and cash in Euros. Payment details are confirmed at the time of booking."
    },
    {
        q: "Do you cover the Amalfi Coast and other scenic routes?",
        a: "Yes! We cover the entire Italian coastline including the Amalfi Coast, Cinque Terre, the Sorrentine Peninsula, and Lake Como. Our drivers know all the scenic routes and best photography spots along the way."
    },
    {
        q: "Can I make multiple stops during a transfer?",
        a: "Yes, for our tourist destination transfers and full-day tours, multiple stops are completely possible. For standard airport-to-hotel transfers, additional stops may incur a small extra charge. Please mention any additional stops when booking."
    },
];

export default function FAQPage() {
    const [open, setOpen] = useState<number | null>(null);
    return (
        <>
            <section className="page-hero">
                <div className="page-hero-orb" style={{ width: 500, height: 500, background: "rgba(212,175,55,0.07)", top: -150, right: -100 }} />
                <div className="container">
                    <div className="page-hero-content">
                        <span className="section-badge">❓ Help Centre</span>
                        <h1>Frequently Asked <span className="text-gold">Questions</span></h1>
                        <p>Everything you need to know about booking and travelling with ItalyTaxi. Can't find your answer? Contact us directly.</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="faq-list">
                        {faqs.map((faq, i) => (
                            <div key={i} className={`faq-item${open === i ? " open" : ""}`}>
                                <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                                    <span>{faq.q}</span>
                                    <span className="faq-icon">+</span>
                                </button>
                                {open === i && (
                                    <div className="faq-answer">{faq.a}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Still need help */}
                    <div style={{ textAlign: "center", marginTop: 80 }}>
                        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginBottom: 16 }}>
                            Still Have a <span className="text-gold">Question?</span>
                        </h3>
                        <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>Our team is available 24/7 to help with any queries.</p>
                        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                            <a href="tel:+390612345678" className="btn btn-primary btn-lg">📞 Call Us Now</a>
                            <a href="mailto:info@italytaxi.com" className="btn btn-secondary btn-lg">✉️ Email Us</a>
                            <Link href="/booking" className="btn btn-outline btn-lg">Book a Ride →</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
