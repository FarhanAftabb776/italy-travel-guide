import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// TypeScript type for a booking row
export interface Booking {
    id?: string;
    created_at?: string;
    service: string;
    pickup: string;
    destination: string;
    date: string;
    time: string;
    flight_number?: string;
    return_trip: boolean;
    passengers: string;
    vehicle: string;
    notes?: string;
    name: string;
    email: string;
    phone: string;
    status?: "pending" | "confirmed" | "cancelled" | "completed";
}
