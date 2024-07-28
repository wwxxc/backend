'use client';

import axios from 'axios';
import Carousel from "@/components/Carousel";
import PopularPage from "@/components/PopularPage";
import Tabs from "@/components/Tabs";
import Image from "next/image";
import Link from "next/link";
import Api from '@/utils/service';
import { useEffect, useState } from "react";
type Props = {
  params: { [lang: string]: string };
};

export default function HomePage({ params: { lang } }: Props) {
 
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    
    const fetchImg = async () => {
      try {
        const response = await axios.get(API_URL + '/slider');
        setSliders(response.data);
        setLoading(false);
      } catch (error) {
        // setLoading(false);
        setError('Failed to fetch images');
      }
    };
    
    const fetchProducts = async () => {
      try {
        const response = await Api.get('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        // setLoading(false);
        setError('Failed to fetch images');
      }
    };

    fetchImg();
    fetchProducts();
  }, []);
  
  return (
    <div>
      <main className="relative bg-background-foreground">
        <section className="relative flex items-center overflow-hidden px-4 py-4 lg:min-h-[521.96px]">
          <div className="container">
            {/* {sliders && <Carousel images={sliders}/>} */}
            {loading ? <div>Loading...</div> : <Carousel images={sliders}/>} 
          </div>
        </section>
      </main>
      <main className="h-screen w-full bg-background">
        <div className="flex flex-col gap-y-8 pt-8">
          <div className="container">
            <PopularPage PopularData={products} currentLang={lang} />
          </div>
          <div className="container">
            <Tabs ProductData={products} currentLang={lang} />
          </div>
        </div>
      </main>
    </div>
  );
}
