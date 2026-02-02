import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Dubai Drive - Luxury & Economy Car Rental",
  description: "Rent premium cars in Dubai – instant booking, airport delivery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ paddingTop: "80px" }}>{children}</main>
      </body>
    </html>
  );
}