import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthProvider } from "@/providers/auth-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Smart Admin",
    template: "%s | Smart Admin",
  },
  description: "Không gian quản trị và kiểm duyệt Smart Platform.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
