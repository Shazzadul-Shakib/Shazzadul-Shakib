import type { Metadata } from "next";
import { League } from "./ui/font";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";


export const metadata: Metadata = {
  title: "Shazzadul Islam Shakib",
  description: "Front-end Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={League.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
