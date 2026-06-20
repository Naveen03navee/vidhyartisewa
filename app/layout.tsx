import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ScrollProgress } from "@/components/scroll-progress";
import { CallbackRequest } from "@/components/forms/callback-form";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Vidhyarthi Sewa - Career & Admission Consultancy | Bangalore",
    template: "%s | Vidhyarthi Sewa",
  },
  description: "Karnataka's most trusted educational consultancy. We help students discover careers, choose the right colleges, and secure admissions. Book free counseling today!",
  keywords: [
    "educational consultant bangalore",
    "admission consultant bangalore",
    "career counseling bangalore",
    "engineering admission bangalore",
    "medical admission bangalore",
    "nursing admission bangalore",
    "KCET counseling bangalore",
    "college admission guidance karnataka",
  ],
  authors: [{ name: "Vidhyarthi Sewa" }],
  creator: "Vidhyarthi Sewa Career & Admission Consultancy",
  metadataBase: new URL("https://vidhyarthisewa.org"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vidhyarthisewa.org",
    siteName: "Vidhyarthi Sewa",
    title: "Vidhyarthi Sewa - Career & Admission Consultancy",
    description: "Karnataka's most trusted educational consultancy helping students secure admissions in top colleges.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vidhyarthi Sewa - Career & Admission Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidhyarthi Sewa - Career & Admission Consultancy",
    description: "Karnataka's most trusted educational consultancy helping students secure admissions in top colleges.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <ScrollProgress />
        <Navigation />
        <main>{children}</main>
        <Footer />
        
        {/* ADDED: A wrapper to hide ALL floating widgets when printing */}
        <div className="print:hidden">
          <WhatsAppButton />
          <CallbackRequest />
        </div>
        
      </body>
    </html>
  );
}