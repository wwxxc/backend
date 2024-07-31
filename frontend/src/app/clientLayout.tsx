"use client";

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
  data,
}:{
  children: React.ReactNode;
  data:Home
}) {
  const pathname = usePathname();
  const hideNavbarAndFooter = pathname === '/id/sign-up' || pathname === '/id/sign-in' || pathname === '/404';
 

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      {children}
      {!hideNavbarAndFooter && data && <Footer {...data} />}
    </>
  );
}
