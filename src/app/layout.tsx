import type { Metadata } from "next";
import "./globals.css";
const title = "Hafsa Fathima | AI/ML Developer Portfolio";
const description =
  "B.Tech AI & Machine Learning undergraduate, expected 2027. Explore Hafsa Fathima’s AI projects, published research, skills, and certificates.";
const url = "https://hafsaff-portfolio.vercel.app";
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: "Hafsa Fathima Portfolio",
    locale: "en_IN",
  },
  twitter: { card: "summary", title, description },
  icons: { icon: "/icon.svg" },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#home">
          Skip to portfolio
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hafsa Fathima",
              url,
              description:
                "Artificial Intelligence & Machine Learning Undergraduate, expected 2027",
              email: "mailto:hafsahffathima05@gmail.com",
              sameAs: [
                "https://github.com/Hafsaf05",
                "https://www.linkedin.com/in/hafsa-fathima05",
              ],
              knowsAbout: [
                "Machine Learning",
                "Multi-Agent Systems",
                "Retrieval-Augmented Generation",
              ],
              affiliation: {
                "@type": "CollegeOrUniversity",
                name: "Jayaprakash Narayana College of Engineering",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
