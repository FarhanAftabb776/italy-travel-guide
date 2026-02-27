import type { Metadata } from "next";
import "./globals.css";
import LayoutContent from "@/components/LayoutContent";

export const metadata: Metadata = {
  title: "ItalyTaxi – Premium Taxi & Transfer Service Across Italy",
  description: "Reliable taxi and transfer services for international tourists across Italy. Airport pickups, hotel transfers, tourist spots, and full-day tours in Rome, Milan, Florence, Venice and more.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
