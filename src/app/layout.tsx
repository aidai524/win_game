import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "SOL Game - 幸运转盘游戏",
  description: "基于Solana区块链的幸运转盘游戏，下注SOL，赢取更多！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
