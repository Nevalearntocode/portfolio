import { Bricolage_Grotesque, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bricolage.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
      style={{ fontFamily: "var(--font-space-grotesk, system-ui, sans-serif)" }}
    >
      {children}
    </div>
  );
}
