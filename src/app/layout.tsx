import { Nunito } from "next/font/google";

import "./globals.css";
import ClientLayout from "@/components/layout";
import { AppProvider } from "@/context/appContext";
import { ItemProvider } from "@/context/itemContext";


const nunito = Nunito({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${nunito.variable} antialiased`}
      >
        <AppProvider>
          <ItemProvider>
            <ClientLayout>{children}</ClientLayout>
          </ItemProvider>
        </AppProvider>
      </body>
    </html>
  );
}
