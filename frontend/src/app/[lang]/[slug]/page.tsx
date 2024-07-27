import axios from 'axios';
import React from 'react';
import Form from '@/components/Form'; 
import '@/styles/customStyle.css';
import { Toaster } from 'react-hot-toast';
import { Globe2, Headset, Zap, ChevronDown } from 'lucide-react'
import Description from '@/components/Deskripsi';

const DetailProduct = async ({ params }: { params: { lang: string, slug: string } }) => {
    const { slug } = params;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        // Mendapatkan data produk
        const product_response: any = await axios.post(`${API_URL}/products/${slug}`);
        const product = product_response.data;        

        // Validasi product
        if (product && product.product_code) {
            const data = {
                filter_type: 'game',
                filter_value: product.product_code
            };

            // Mendapatkan data produk terkait
            const listProduct_response: any = await axios.post(`${API_URL}/layanan/games`, data);
            const listProduct = listProduct_response.data.data;

            // Mendapatkan data pembayaran
            const payment_response: any = await axios.post(`${API_URL}/payment/list`);
            const payment = payment_response.data;

            return (
                <main className="relative bg-[#393E46]">
                    <div className="relative h-56 w-full bg-muted lg:h-[340px]">
                        <img src={product.product_banner} alt="" className='object-cover object-center' style={{position:'absolute',height:'100%',width:'100%',left:0,top:0,right:0,bottom:0,color:'transparent'}} />
                    </div>
                    <div className="z-20 banner-container flex min-h-32 w-full border-y items-center bg-[#393E46] lg:min-h-[160px]">
                        <div className="container flex items-center gap-2">
                            <div>
                                <div className="flex items-start gap-4">
                                    <div className="relative -top-28 " style={{perspective: '50em'}}>
                                        <img
                                            className="z-20 -mb-14 aspect-square w-32 rounded-2xl object-cover shadow-2xl md:-mb-20 md:w-60"
                                            src={product.product_img || '/default-image.jpg'}
                                            width={300}
                                            height={300}
                                            style={{ position: 'relative', transform: 'rotateY(20deg) rotateX(-4deg)', transformOrigin: 'center left'}}
                                            alt={product.product_name || 'Product Image'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="py-4 sm:py-0">
                                <h1 className="text-xs font-bold uppercase leading-7 tracking-wider sm:text-lg">
                                    {product.product_name || 'Product Name'}
                                </h1>
                                <p className="text-xs font-medium sm:text-base/6">
                                    {product.product_provider || 'Product Provider'}
                                </p>
                                <div className="mt-4 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-8 sm:text-sm/6">
                                    <div className="flex items-center gap-2">
                                        <Globe2 color='#33E512' size={18} />
                                        <span>{product.product_type}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Headset color='#2993C4' size={18} />
                                        <span>Layanan Chat 24/7</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Zap color='#ffd966' size={18} />
                                        <span>Proses Cepat</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container relative mt-8 grid grid-cols-3 gap-4 md:gap-8">
                        <div className="col-span-3 lg:col-span-1">
                            <div className="sticky top-[90px] flex flex-col gap-8">
                                <div className="space-y-2">
                                    <Description product={product} />
                                </div>
                                <div className="hidden lg:block">
                                    {/* Ulasan */}
                                </div>
                            </div>
                        </div>
                        <Form slug={slug} product={product} listPayment={payment} listProduct={listProduct} />
                    </div>
                    <div className="z-40">
                        <Toaster />
                    </div>
                </main>
            );
        } else {
            return <div>Product not found or invalid data.</div>;
        }
    } catch (error: any) {
        console.error('Error fetching product:', error);
        return <div>Error fetching product details. {error.message}</div>;
    }
};

export default DetailProduct;
