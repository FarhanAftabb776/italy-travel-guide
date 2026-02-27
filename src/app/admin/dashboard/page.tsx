"use client";
import { useEffect, useState, useMemo } from "react";
import { supabase, Booking } from "@/lib/supabase";
import {
    LayoutDashboard,
    Calendar,
    Users,
    Car,
    Settings,
    LogOut,
    Search,
    CheckCircle2,
    XCircle,
    Clock,
    CheckCircle,
    ArrowRight,
    SearchX,
    TrendingUp,
    Mail,
    Phone,
    Plane,
    CreditCard,
    ChevronRight,
    UserCircle,
    Bell,
    ExternalLink,
    RefreshCw,
    Plus,
    X,
    Filter
} from "lucide-react";

type AdminView = "dashboard" | "bookings" | "customers" | "fleet" | "analytics" | "settings";

const cities = ["Rome", "Milan", "Florence", "Venice", "Naples", "Bologna", "Pisa", "Amalfi"];
const services = ["Airport Transfer", "Hotel Transfer", "Tourist Destination Tour", "Full Day Tour", "City-to-City Transfer", "Private Chauffeur"];
const vehicles = ["Standard Saloon (1–3 pax)", "Executive Saloon (1–3 pax)", "MPV / People Carrier (4–7 pax)", "Minibus (8–16 pax)"];

export default function AdminDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeView, setActiveView] = useState<AdminView>("dashboard");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const [showBookingModal, setShowBookingModal] = useState(false);

    // New Booking Form State
    const [newBooking, setNewBooking] = useState<Partial<Booking>>({
        service: services[0],
        pickup: "",
        destination: "",
        date: new Date().toISOString().split('T')[0],
        time: "12:00",
        passengers: "1 Passenger",
        vehicle: vehicles[0],
        name: "",
        email: "",
        phone: "",
        return_trip: false,
        status: "pending"
    });

    // Initial Fetch & Real-time setup
    useEffect(() => {
        fetchBookings();

        const channel = supabase
            .channel('admin-realtime')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'bookings' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setBookings(prev => [payload.new as Booking, ...prev]);
                        showToast("New booking received!", "success");
                    } else if (payload.eventType === 'UPDATE') {
                        setBookings(prev => prev.map(b => b.id === payload.new.id ? payload.new as Booking : b));
                    } else if (payload.eventType === 'DELETE') {
                        setBookings(prev => prev.filter(b => b.id !== payload.old.id));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("bookings")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setBookings(data || []);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            showToast("Failed to fetch records", "error");
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const updateStatus = async (id: string, status: string) => {
        setActionLoading(id);
        try {
            const { error } = await supabase
                .from("bookings")
                .update({ status })
                .eq("id", id);

            if (error) throw error;

            // Automation: Notify Customer of Status Change (Confirmed/Cancelled)
            const targetBooking = bookings.find(b => b.id === id);
            if (targetBooking && (status === 'confirmed' || status === 'cancelled')) {
                await fetch('/api/notify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'status_update', booking: { ...targetBooking, status } })
                });
            }

            showToast(`Booking marked as ${status}`, "success");
        } catch (err) {
            console.error("Status update error:", err);
            showToast("Update failed", "error");
        } finally {
            setActionLoading(null);
        }
    };

    const deleteBooking = async (id: string) => {
        if (!confirm("Delete this record permanently?")) return;

        setActionLoading(id);
        try {
            const { error } = await supabase.from("bookings").delete().eq("id", id);
            if (error) throw error;
            showToast("Record deleted", "success");
        } catch (err) {
            showToast("Deletion failed", "error");
        } finally {
            setActionLoading(null);
        }
    };

    const handleCreateBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.from("bookings").insert([newBooking]);
            if (error) throw error;

            // Automation: Notify Customer of Received Manual Booking
            await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'new_booking', booking: newBooking })
            }).catch(e => console.error("Admin Manual Notify failed", e));

            showToast("Manual booking created!", "success");
            setShowBookingModal(false);
            setNewBooking({
                service: services[0], pickup: "", destination: "",
                date: new Date().toISOString().split('T')[0], time: "12:00",
                passengers: "1 Passenger", vehicle: vehicles[0],
                name: "", email: "", phone: "", return_trip: false, status: "pending"
            });
        } catch (err) {
            showToast("Failed to create booking", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/admin/login";
    };

    // Analytics
    const stats = useMemo(() => {
        const completed = bookings.filter(b => b.status === 'completed');
        const totalRev = completed.length * 68;
        return {
            total: bookings.length,
            pending: bookings.filter(b => b.status === 'pending').length,
            confirmed: bookings.filter(b => b.status === 'confirmed').length,
            completed: completed.length,
            revenue: totalRev
        };
    }, [bookings]);

    const filteredBookings = useMemo(() => {
        return bookings.filter(b => {
            const matchesStatus = statusFilter === "all" || b.status === statusFilter;
            const term = searchTerm.toLowerCase();
            return matchesStatus && (
                b.name.toLowerCase().includes(term) ||
                b.email.toLowerCase().includes(term) ||
                b.pickup.toLowerCase().includes(term) ||
                b.destination.toLowerCase().includes(term)
            );
        });
    }, [bookings, statusFilter, searchTerm]);

    const uniqueCustomers = useMemo(() => {
        const map = new Map();
        bookings.forEach(b => {
            if (!map.has(b.email)) {
                map.set(b.email, { name: b.name, email: b.email, phone: b.phone, count: 1, last: b.date });
            } else {
                const existing = map.get(b.email);
                existing.count += 1;
                if (b.date > existing.last) existing.last = b.date;
            }
        });
        return Array.from(map.values()).sort((a, b) => b.count - a.count);
    }, [bookings]);

    // Components
    const StatCard = ({ icon: Icon, label, value, color, prefix = "" }: any) => (
        <div className="booking-card" style={{ padding: 24, flex: 1, minWidth: 220, borderTop: `4px solid ${color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ padding: 12, background: `${color}10`, borderRadius: 12, color: color }}>
                    <Icon size={24} />
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.75rem', color: '#666', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{label}</p>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{prefix}{value}</h3>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ minHeight: "100vh", display: "flex", background: "#05050a", color: "#eee" }}>

            {/* Nav Sidebar */}
            <aside style={{ width: 280, borderRight: "1px solid rgba(255,255,255,0.05)", padding: "40px 24px", display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.01)" }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48, paddingLeft: 8 }}>
                    <div style={{ width: 42, height: 42, background: 'var(--grad-gold)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>🚕</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '-0.03em' }}>Italy<span className="text-gold">Taxi</span></div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {[
                        { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
                        { id: "bookings", icon: Calendar, label: "Journeys" },
                        { id: "customers", icon: Users, label: "Clients" },
                        { id: "fleet", icon: Car, label: "Vehicles" },
                        { id: "analytics", icon: TrendingUp, label: "Growth" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveView(item.id as AdminView)}
                            style={{
                                display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 12,
                                background: activeView === item.id ? "rgba(212,175,55,0.08)" : "transparent",
                                color: activeView === item.id ? "var(--gold)" : "#777",
                                fontWeight: activeView === item.id ? 700 : 500,
                                fontSize: "0.95rem", transition: "0.2s"
                            }}
                            className={activeView !== item.id ? "sidebar-hover" : ""}
                        >
                            <item.icon size={20} /> {item.label}
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <button onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", color: "#ff4444", fontWeight: 700, fontSize: "0.95rem" }}>
                        <LogOut size={20} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Content Container */}
            <main style={{ flex: 1, padding: "40px 60px", overflowY: "auto", maxHeight: "100vh" }}>

                {/* View Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", fontWeight: 800 }}>{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h1>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button className="btn btn-secondary btn-sm" onClick={fetchBookings}>
                            <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Sync
                        </button>
                        <button className="btn btn-primary btn-sm" onClick={() => setShowBookingModal(true)}>
                            <Plus size={16} /> New Booking
                        </button>
                    </div>
                </div>

                {/* Statistics Highlights */}
                {activeView === "dashboard" && (
                    <>
                        <div style={{ display: "flex", gap: 24, marginBottom: 40 }}>
                            <StatCard icon={Clock} label="Pending" value={stats.pending} color="var(--gold)" />
                            <StatCard icon={CheckCircle2} label="Confirmed" value={stats.confirmed} color="#3b82f6" />
                            <StatCard icon={CheckCircle} label="Trips Done" value={stats.completed} color="var(--green)" />
                            <StatCard icon={CreditCard} label="Revenue" value={stats.revenue} prefix="€" color="#a855f7" />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 32 }}>
                            <div className="booking-card" style={{ padding: 32 }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: 24 }}>Recent Arrivals</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    {bookings.slice(0, 4).map(b => (
                                        <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ display: 'flex', gap: 16 }}>
                                                <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.03)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
                                                <div>
                                                    <p style={{ fontWeight: 700 }}>{b.name}</p>
                                                    <p style={{ fontSize: '0.8rem', color: '#666' }}>{b.pickup} → {b.destination}</p>
                                                </div>
                                            </div>
                                            <span className={`badge ${b.status === 'pending' ? 'badge-gold' : 'badge-green'}`} style={{ fontSize: '0.7rem' }}>{b.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="booking-card" style={{ padding: 32 }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: 24 }}>System Health</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {[
                                        { l: "Supabase DB", s: "Operational", c: "var(--green)" },
                                        { l: "Auth Service", s: "Operational", c: "var(--green)" },
                                        { l: "Edge Functions", s: "Online", c: "var(--green)" }
                                    ].map(item => (
                                        <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                            <span style={{ color: '#666' }}>{item.l}</span>
                                            <span style={{ color: item.c, fontWeight: 700 }}>{item.s}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Main Records List (Journeys / Bookings) */}
                {activeView === "bookings" && (
                    <>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
                                <input className="form-input" style={{ paddingLeft: 48 }} placeholder="Find by name, city, email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                            </div>
                            <select className="form-input" style={{ width: 180 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {filteredBookings.map(b => (
                                <div key={b.id} className="booking-card" style={{ padding: 24 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 1fr 1fr 180px', gap: 24, alignItems: 'center' }}>
                                        <div>
                                            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                                <span className={`badge ${b.status === 'pending' ? 'badge-gold' : b.status === 'confirmed' ? 'badge-blue' : 'badge-green'}`} style={{ border: 'none' }}>{b.status}</span>
                                            </div>
                                            <h4 style={{ fontWeight: 800 }}>{b.pickup} → {b.destination}</h4>
                                            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: 4 }}>📅 {b.date} • ⌚ {b.time}</p>
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 700 }}>{b.name}</p>
                                            <p style={{ fontSize: '0.8rem', color: '#666' }}>{b.email}</p>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#888' }}>
                                            <p>{b.vehicle.split('(')[0]}</p>
                                            <p>{b.passengers}</p>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            {b.status === 'pending' && <button className="btn btn-primary btn-sm" onClick={() => b.id && updateStatus(b.id, 'confirmed')}>Approve</button>}
                                            {b.status === 'confirmed' && <button className="btn btn-primary btn-sm" style={{ background: 'var(--green)' }} onClick={() => b.id && updateStatus(b.id, 'completed')}>Done</button>}
                                            <button className="btn btn-secondary btn-sm" style={{ borderColor: '#333' }} onClick={() => b.id && deleteBooking(b.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Clients View */}
                {activeView === "customers" && (
                    <div className="booking-card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: 'rgba(255,255,255,0.02)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <tr>
                                    <th style={{ padding: '20px 32px' }}>Client Name</th>
                                    <th style={{ padding: '20px 32px' }}>Frequency</th>
                                    <th style={{ padding: '20px 32px' }}>Contact</th>
                                    <th style={{ padding: '20px 32px' }}>Last Booking</th>
                                </tr>
                            </thead>
                            <tbody>
                                {uniqueCustomers.map(c => (
                                    <tr key={c.email} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td style={{ padding: '24px 32px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <div style={{ width: 34, height: 34, background: 'var(--gold-dim)', borderRadius: '50%', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{c.name[0]}</div>
                                                <span style={{ fontWeight: 700 }}>{c.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '24px 32px' }}>
                                            <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 20 }}>{c.count} Rides</span>
                                        </td>
                                        <td style={{ padding: '24px 32px', fontSize: '0.85rem' }}>
                                            <p>{c.email}</p>
                                            <p style={{ color: '#555' }}>{c.phone}</p>
                                        </td>
                                        <td style={{ padding: '24px 32px', color: '#666', fontSize: '0.85rem' }}>{c.last}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Other Views Placeholders */}
                {(activeView === "fleet" || activeView === "analytics") && (
                    <div className="info-card" style={{ textAlign: 'center', padding: '100px 0', borderStyle: 'dashed' }}>
                        <Settings size={48} className="text-gold" style={{ margin: '0 auto 20px', opacity: 0.2 }} />
                        <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Module in Early Access</h3>
                        <p style={{ color: '#666' }}>The {activeView} controller is scheduled for the next system update.</p>
                    </div>
                )}
            </main>

            {/* Manual Booking Modal */}
            {showBookingModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                    <div className="booking-card" style={{ maxWidth: 700, width: '100%', padding: 40, border: '1px solid rgba(212,175,55,0.3)', position: 'relative' }}>
                        <button onClick={() => setShowBookingModal(false)} style={{ position: 'absolute', top: 24, right: 24, padding: 8, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}><X size={20} /></button>
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: '1.8rem', marginBottom: 32 }}>Manual <span className="text-gold">Trip Entry</span></h2>

                        <form onSubmit={handleCreateBooking} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                            <div className="form-group">
                                <label className="form-label">Passenger Name</label>
                                <input className="form-input" required value={newBooking.name} onChange={e => setNewBooking({ ...newBooking, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input className="form-input" type="email" required value={newBooking.email} onChange={e => setNewBooking({ ...newBooking, email: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input className="form-input" required value={newBooking.phone} onChange={e => setNewBooking({ ...newBooking, phone: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Service Type</label>
                                <select className="form-input" value={newBooking.service} onChange={e => setNewBooking({ ...newBooking, service: e.target.value })}>
                                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Pickup City/Address</label>
                                <input className="form-input" required value={newBooking.pickup} onChange={e => setNewBooking({ ...newBooking, pickup: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Destination</label>
                                <input className="form-input" required value={newBooking.destination} onChange={e => setNewBooking({ ...newBooking, destination: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Date</label>
                                <input className="form-input" type="date" required value={newBooking.date} onChange={e => setNewBooking({ ...newBooking, date: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Time</label>
                                <input className="form-input" type="time" required value={newBooking.time} onChange={e => setNewBooking({ ...newBooking, time: e.target.value })} />
                            </div>
                            <div style={{ gridColumn: 'span 2', display: 'flex', gap: 12, marginTop: 12 }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>{loading ? "Saving..." : "Create Booking"}</button>
                                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowBookingModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Global Toasts */}
            {toast && (
                <div style={{
                    position: 'fixed', bottom: 32, right: 32, padding: "16px 24px", borderRadius: 12,
                    background: toast.type === 'success' ? '#10b981' : '#ff4444',
                    color: '#fff', fontSize: '0.9rem', fontWeight: 700, boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                    display: 'flex', alignItems: 'center', gap: 12, animation: 'slideIn 0.3s ease-out', zIndex: 10000
                }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: 6, borderRadius: '50%' }}><CheckCircle size={16} /></div>
                    {toast.message}
                </div>
            )}

            <style jsx global>{`
                .sidebar-hover:hover { background: rgba(255,255,255,0.05) !important; color: white !important; }
                .text-gold { color: var(--gold); }
                .badge-blue { background: rgba(59,130,246,0.15); color: #3b82f6; }
                @keyframes slideIn { from { transform: translateX(120%); } to { transform: translateX(0); } }
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
