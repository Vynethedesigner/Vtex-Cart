import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VTEX Cart Prototype",
  description: "Interactive cart prototype built from Figma designs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
