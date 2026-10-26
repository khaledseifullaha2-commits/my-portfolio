import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StatusBar from "@/components/StatusBar";
import Footer from "@/components/Footer";
import Dock from "@/components/Dock";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import AiAssistant from "@/components/AiAssistant";
import { site } from "@/data/site";

/* Editorial serif used only for italic accent words in headlines */
const serifItalic = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://my-portfolio-main-cyan-chi.vercel.app"),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Khaled Seifullaha",
    "Talent Specialist",
    "Executive Talent Specialist",
    "Talent Acquisition",
    "Recruitment",
    "HR",
    "Dhaka",
    "Bangladesh",
    "AI recruitment",
    "Candidate Sourcing",
    "HR automation",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${site.name} - Portfolio`,
    title: `${site.name} | ${site.role}`,
    description: site.description,
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: site.description,
    images: ["/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a0708",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={serifItalic.variable}>
      <body className="min-h-screen antialiased">
        <ScrollProgress />
        <CustomCursor />
        <header className="site-header">
          <StatusBar />
          <Navbar />
        </header>
        <main className="pt-[5.75rem]">{children}</main>
        <Footer />
        <Dock />
        <AiAssistant />
      </body>
    </html>
  );
}
