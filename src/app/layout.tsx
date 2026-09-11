import type { Metadata } from "next";
import { Bebas_Neue, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KING KOHLI: The Journey — A Tribute to Virat Kohli",
  description:
    "An unofficial fan tribute chronicling Virat Kohli's extraordinary cricket career — from debut to legend. Stats, highlights, awards, and fan zone.",
  keywords: [
    "Virat Kohli",
    "cricket",
    "India cricket",
    "RCB",
    "IPL",
    "tribute",
    "King Kohli",
    "career stats",
    "highlights",
  ],
  openGraph: {
    title: "KING KOHLI: The Journey",
    description:
      "A tribute to Virat Kohli's cricket career — debut to legend. Stats, highlights, and more.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} ${playfairDisplay.variable} antialiased`}
    >
      <body className="min-h-screen bg-base text-primary font-[family-name:var(--font-body)] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
