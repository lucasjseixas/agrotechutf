import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chamada API Agrofit",
  description: "Interface para chamada API Agrofit da Embrapa",
  keywords: "agrofit, embrapa, api, agricultura, pragas, culturas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
