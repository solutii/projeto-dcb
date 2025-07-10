import type { Metadata } from "next";
import { Kodchasan, Orbitron } from "next/font/google";
import "./globals.css";

const kodchasan = Kodchasan({
  variable: '--font-kodchasan',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});


export const metadata: Metadata = {
  title: "DCB Distribuidora",
  description: "Portal de Clientes DCB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon_dcb.png" type="image/png" />
      </head>
      <body
        className={`${kodchasan.variable} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
