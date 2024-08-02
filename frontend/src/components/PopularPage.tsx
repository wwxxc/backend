'use client'
import Link from "next/link"
import '@/styles/customStyle.css';
import { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import SkeletonPage from "./Skeleton"
const PopularPage = ({currentLang}:{currentLang: string}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`${API_URL}/products`) 
          const allProducts = response.data;
          const popularProducts = allProducts.filter((product: Product) => product.isPopular);
          setProducts(popularProducts);
          setLoading(false);
        } catch (error) {
          // setLoading(false);
          setError('Failed to fetch images');
        }
      };
      fetchProducts();
    }, [])    

    return ( 
        <>
        <div className="mb-5">
              <h3 className="text-lg font-semibold uppercase leading-relaxed tracking-wider">
                🔥 POPULER SEKARANG!
              </h3>
              <p className="pl-6 text-xs"> 
                Berikut adalah beberapa produk yang paling populer saat ini.
              </p>
         {loading ? (
           <SkeletonPage />
         ): (
          <motion.ul
            className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-5"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  when: "beforeChildren", 
                },
              },
              hidden: {
                transition: {
                  staggerChildren: 0.2, 
                  when: "afterChildren",
                },
              },
            }}
          >
            {products.map((item, index) => (
              <Link href={`${currentLang}/${item.product_slug}`} key={item.id}>
                <motion.li
                  className="mt-2 p-2 banner-container bg-muted rounded-xl flex items-center hover:scale-105 transition-transform duration-300 "
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.1 }}
                  >
                  <img className="aspect-square h-14 w-14 rounded-lg ring-1 ring-primary/20 object-cover md:h-20 md:w-20" src={item.product_img} alt={item.product_name} />
                  <div className="ml-3 text-white">
                    <h6 className="text-xs font-bold">{item.product_name}</h6>
                    <p className="text-xs">{item.product_provider}</p>
                  </div>
                </motion.li>
              </Link>
            ))}
          </motion.ul>
         )}
            </div>
        </>
     )
}

export default PopularPage