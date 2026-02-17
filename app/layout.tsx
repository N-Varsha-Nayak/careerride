import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./print.css";
import { ResumeProvider } from "@/app/contexts/ResumeContext";
import { BuildProvider } from "@/app/contexts/BuildContext";
import { TemplateProvider } from "@/app/contexts/TemplateContext";
import { ToastProvider } from "@/app/contexts/ToastContext";
import { UserProvider } from "@/app/contexts/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KodNest Suite",
  description: "Unified SaaS workspace for resume building, placement preparation, and job tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <ToastProvider>
            <BuildProvider>
              <TemplateProvider>
                <ResumeProvider>{children}</ResumeProvider>
              </TemplateProvider>
            </BuildProvider>
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  );
}
