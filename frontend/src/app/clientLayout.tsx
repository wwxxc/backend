"use client";

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNavbarAndFooter = pathname === '/id/sign-up' || pathname === '/id/sign-in' || pathname === '/404';
  const [home, setHome] = useState<Home>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await axios.get(API_URL + '/home');
        setHome(response.data);
        setLoading(false);
      } catch (error) {
        // setLoading(false);
        setError('Failed to fetch images');
      }
    }

    fetchHome();
  }, [API_URL]);
  

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      {children}
      {!hideNavbarAndFooter && home && <Footer {...home} />}
    </>
  );
}
