import { JetBrains_Mono, Onest } from "next/font/google";

// Scoped to the .sf-theme wrapper via CSS variables; the rest of the site keeps Inter.
export const sfSans = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--sf-font-sans",
  display: "swap",
});

export const sfMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--sf-font-mono",
  display: "swap",
});
