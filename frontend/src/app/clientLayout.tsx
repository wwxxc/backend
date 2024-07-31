"use client";

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ClientLayout({
  children,
  data
}:{
  children: React.ReactNode;
  data:Home
}) {
  const pathname = usePathname();
  const hideNavbarAndFooter = pathname === '/id/sign-up' || pathname === '/id/sign-in' || pathname === '/404';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      {children}
      {!hideNavbarAndFooter && data && <Footer {...data} />}
    </>
  );
}
