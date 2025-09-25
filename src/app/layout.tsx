import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AGROTECH ~ UTFPR",
  description: "Interface para chamada API Agrofit da Embrapa",
  keywords: "agrofit, embrapa, api, agricultura, pragas, culturas",
  icons: {
    icon: "/logo2.ico",
  },
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
