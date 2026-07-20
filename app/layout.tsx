import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { PublicLayout } from "@/components/PublicLayout";
import { SidebarFormProvider } from "@/components/sidebar/SidebarFormProvider";
import { SidebarProjectForm } from "@/components/sidebar/SidebarProjectForm";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.swawebhub.com"),
  title: {
    default: "SWAWEBHUB — Web Design, Development & SEO",
    template: "%s | SWAWEBHUB",
  },
  description:
    "SWAWEBHUB builds modern, high-converting websites with web design, development, and SEO. Start your project today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "SWAWEBHUB",
    title: "SWAWEBHUB — Web Design, Development & SEO",
    description:
      "Modern, high-converting websites with web design, development, and SEO.",
    url: "https://www.swawebhub.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "SWAWEBHUB — Web Design, Development & SEO",
    description:
      "Modern, high-converting websites with web design, development, and SEO.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body suppressHydrationWarning>
        <SidebarFormProvider>
          <PublicLayout>
            {children}
          </PublicLayout>
          <SidebarProjectForm />
        </SidebarFormProvider>
      </body>
    </html>
  );
}
