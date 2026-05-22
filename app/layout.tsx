import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qasara.ai"),
  title: {
    default: "Qasara — Where Canton Flows",
    template: "%s · Qasara",
  },
  description:
    "Qasara builds the infrastructure layer for the institutional Canton Network era — a wallet API and a cross-chain bridge.",
  keywords: [
    "Canton Network",
    "Canton wallet API",
    "Canton bridge",
    "institutional blockchain",
    "CIP-56",
    "Cove wallet",
    "Qasara",
  ],
  openGraph: {
    title: "Qasara — Where Canton Flows",
    description:
      "Building the infrastructure layer for Canton Network. Cove wallet API and a cross-chain bridge for institutions.",
    url: "https://qasara.ai",
    siteName: "Qasara",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qasara — Where Canton Flows",
    description:
      "Building the infrastructure layer for Canton Network.",
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        <Nav />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
