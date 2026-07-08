import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pranavyadav.dev"),
  title: "Pranav Yadav — Full Stack Engineer",
  description:
    "Full Stack Engineer with 9 years across backend, frontend, and product. Previously CTO at On The Move; now on Toptal client engagements and building Story of a Stock.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pranav Yadav — Full Stack Engineer",
    description:
      "9 years shipping product across backend, frontend, and the full stack. Previously CTO at On The Move.",
    url: "/",
    siteName: "Pranav Yadav",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranav Yadav — Full Stack Engineer",
    description:
      "9 years shipping product across backend, frontend, and the full stack. Previously CTO at On The Move.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pranav Yadav",
  url: "https://pranavyadav.dev",
  jobTitle: "Full Stack Engineer",
  description:
    "Full Stack Engineer with 9 years across backend, frontend, and product. Previously CTO at On The Move.",
  email: "mailto:pranavyadav996@gmail.com",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Delhi Technological University",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/pranav-9",
    "https://www.linkedin.com/in/pranav-yadav-375247b6/",
    "https://www.toptal.com/developers/resume/pranav-yadav",
  ],
  knowsAbout: [
    "LLM pipelines",
    "Next.js",
    "Node.js",
    "Full-stack development",
    "AI automation",
    "Webflow to Next.js migrations",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
