import { Playfair_Display, Poppins } from "next/font/google";
import LogoutButton from "@/components/LogoutButton";
import "./globals.css";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const body = Poppins({ subsets: ["latin"], weight: ["300", "400", "600"], variable: "--font-body" });

export const metadata = {
  title: "For My Love ❤️",
  description: "A special birthday surprise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-sans relative`}>
        {/* Global components rendered across all pages */}
        <LogoutButton />
        
        {children}
      </body>
    </html>
  );
}