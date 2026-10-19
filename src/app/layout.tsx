import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mohammedssab.github.io"),
  title: "Mohammed Sab Sagari | DevOps Engineer & Linux Administrator",
  description:
    "Interactive Kubernetes CLI portfolio of Mohammed Sab Sagari, a DevOps Engineer & Linux Administrator specializing in CI/CD, Kubernetes, Docker, Helm, Argo CD, Ansible, and Prometheus observability.",
  keywords: [
    "Mohammed Sab Sagari",
    "DevOps Engineer",
    "Linux System Administrator",
    "Kubernetes",
    "Docker",
    "Helm",
    "Argo CD",
    "CI/CD",
    "GitHub Actions",
    "Prometheus",
    "Grafana",
    "Ansible",
    "PostgreSQL",
    "Pune",
  ],
  authors: [{ name: "Mohammed Sab Sagari", url: "https://mohammedssab.github.io" }],
  creator: "Mohammed Sab Sagari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohammedssab.github.io",
    siteName: "Mohammed Sab Sagari Portfolio",
    title: "Mohammed Sab Sagari | DevOps Engineer & Linux Administrator",
    description:
      "Interactive Kubernetes CLI portfolio exploring professional workloads, CI/CD pipelines, container orchestration, and system reliability.",
    images: [
      {
        url: "/photo.jpg",
        width: 800,
        height: 800,
        alt: "Mohammed Sab Sagari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Sab Sagari | DevOps Engineer & Linux Administrator",
    description:
      "Interactive Kubernetes CLI portfolio exploring professional workloads, CI/CD pipelines, and cloud-native infrastructure.",
    creator: "@Mohammedsagari",
    images: ["/photo.jpg"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${firaCode.variable} font-sans bg-[#070d18] text-slate-300 antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
