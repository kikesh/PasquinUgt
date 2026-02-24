import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UGT Editorial",
  description: "Editor y visor de revista digital"
};

import { PWARegister } from "./pwa-register";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body><PWARegister />{children}</body>
    </html>
  );
}
