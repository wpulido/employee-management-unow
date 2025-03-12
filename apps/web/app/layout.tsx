"use client";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import { AuthProvider } from '../context/AuthContext';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token && !['/login', '/register'].includes(window.location.pathname)) {
      router.push("/login");
    }
  }, [router]);
  return (
    <html lang="en">
      <body>
      <AuthProvider>
        {children}
      </AuthProvider>
      </body>
    </html>
  );
}
