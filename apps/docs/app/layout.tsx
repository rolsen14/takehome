import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Dropback Assignments",
  description: "Documentation and assignments for Dropback developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            backgroundColor: "var(--background)",
            backdropFilter: "blur(10px)",
            zIndex: 10,
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <Link
            href="/"
            style={{
              fontWeight: "bold",
              fontSize: "1.25rem",
              color: "var(--foreground)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
              <path d="M8 7h6"></path>
              <path d="M8 11h8"></path>
              <path d="M8 15h5"></path>
            </svg>
            Dropback Take-Home
          </Link>
          <nav
            style={{
              display: "flex",
              gap: "1.5rem",
            }}
          >
            <Link
              href="/assignments"
              style={{
                color: "var(--foreground)",
                fontWeight: 500,
                position: "relative",
                padding: "0.25rem 0",
              }}
            >
              Assignments
            </Link>
          </nav>
        </header>
        <main className="fade-in" style={{ minHeight: "calc(100vh - 132px)" }}>
          {children}
        </main>
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "1.5rem 2rem",
            textAlign: "center",
            fontSize: "0.9rem",
            color: "#666",
            backgroundColor: "var(--secondary)",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              © {new Date().getFullYear()} Dropback. All rights reserved.
            </div>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
              }}
            />
          </div>
        </footer>
      </body>
    </html>
  );
}
