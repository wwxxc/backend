'use client'
import axios from "axios"
import { Fragment, useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'
import { motion } from "framer-motion"
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Description, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import toast, { Toaster } from 'react-hot-toast';
import React from "react"

const DetailProduct = ({ params }: { params: { lang: string, slug: string} }) =>{
    const slug = params.slug
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const [id, setId] = useState('')
    const [server, setServer] = useState('')
    const [username, setUsername] = useState('')
    const [product, setProduct] = useState<Product>();
    const [listProduct, setListProduct] = useState<ListProduk[]>([]);
    const [listPayment, setListPayment] = useState<ListPayment[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ListProduk>();
    const [selectedPayment, setSelectedPayment] = useState<ListPayment>();
    const [totalPrice, setTotalPrice] = useState('');
    const [isCollapsed1, setIsCollapsed1] = useState(true);
    const [isCollapsed2, setIsCollapsed2] = useState(true);
    const [isCollapsed3, setIsCollapsed3] = useState(true);
    const [phone, setPhone] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const notifyError = (msg: string) => toast.error(msg);
    let completeButtonRef = useRef(null)
    async function submitOrder() {
        if (id === '') {
            notifyError('Silahkan lengkapi data akun terlebih dahulu');
            window.scrollTo({ top: 200, behavior: 'smooth' });
        } else if (product?.isServer && server === '') {
            notifyError('Silahkan lengkapi data akun terlebih dahulu');
            window.scrollTo({ top: 200, behavior: 'smooth' });
        } else if (selectedProduct === undefined) {
            notifyError('Silahkan pilih item terlebih dahulu');
        } else if (selectedPayment === undefined) {
            notifyError('Silahkan pilih metode pembayaran terlebih dahulu');
            window.scrollTo({ top: 1710, behavior: 'smooth' });
        } else if (phone.length < 9) {
            notifyError('Silahkan lengkapi No Whatsapp terlebih dahulu');
            window.scrollTo({ top: 2200, behavior: 'smooth' });
        } else {
            setIsLoading(true);
            if (product?.isCheckUsername) {
                try {
                    const data = await checkUsername(product.checkUsername_code, id, server);
                    if(data.result) {
                        setUsername(data.data);
                        setIsLoading(false);
                    } else {
                        setIsLoading(false);
                        if(data.message === 'Akun game tidak dapat ditemukan.') {
                            notifyError('ID Akun tidak ditemukan');
                        } else {
                            notifyError(data.message);
                        }
                        return;
                    }
                } catch (error) {
                    console.error('Error checking username:', error);
                    notifyError('Terjadi kesalahan saat memeriksa username');
                    return;
                }
            }
            setModalOpen(true);
        }
    }

    const handleTotalPrice = (data: ListPayment) => {
        console.log(data);
        
    }


    
    function completeOrder() {
        notifyError('Pesanan anda sedang diproses, silahkan tungungi wa admin kami')
    }

    const toggleCollapse1 = () => {
        setIsCollapsed1(!isCollapsed1);
    };
    const toggleCollapse2 = () => {
        setIsCollapsed2(!isCollapsed2);
    };
    const toggleCollapse3 = () => {
        setIsCollapsed3(!isCollapsed3);
    };
    
    
    useEffect(() => {
        axios.post(`${API_URL}/products/${slug}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
            });
    }, [slug]);

    useEffect(() => {
        if (product) {
            const data = {
                filter_type: 'game',
                filter_value: product.product_code
            };
            
            axios.post(`${API_URL}/layanan/games`, data)
                .then(response => {
                    setListProduct(response.data.data); 
                })
                .catch(error => {
                    console.error("Error fetching layanan/games:", error);
                });
        }
    
    }, [product]);

    async function checkUsername(code: string, id: string, server: string) {
        const data = {
            code: code,
            id: id,
            server: server
        };
    
        try {
            const response = await axios.post(`${API_URL}/account/check-game`, data);
            console.log(response.data.data);
            return response.data.data;
            
        } catch (error) {
            console.error("Error fetching account", error);
            return null; 
        }
    }

    useEffect(() => {
        axios.post(`${API_URL}/payment/list`)
            .then(response => {
                setListPayment(response.data);
            })
            .catch(error => {
                console.error("Error fetching payment:", error);
            });
    }, []);

    const handleSelectProduct = (product: any) => {
        setSelectedProduct(product);
    };
    const handleSelectPayment = (payment: any) => {
        setSelectedPayment(payment);
        setTotalPrice(( selectedProduct && selectedProduct?.normal_price.basic + payment.total_fee.flat + (parseFloat(payment.total_fee.percent) * selectedProduct?.normal_price.basic / 100) ).toLocaleString('id-ID', { maximumFractionDigits: 0} ))
    };
    
    
    
    return(
        <main className="relative bg-[#393E46]">
            <div className="relative h-56 w-full bg-muted lg:h-[340px]">
                {/* <img src="https://via.placeholder.com/800x400" alt="" /> */}
            </div>
            <div className="bg-title-product flex min-h-32 w-full items-center border-y bg-[#393E46] lg:min-h-[160px] bg-order-header-image bg-cover bg-center">
                <div className="container flex items-center gap-2">
                    <div>
                        <div className="flex items-start gap-4">
                            <div className="product-thumbnail-container relative -top-28">
                                <img className="z-20 -mb-14 aspect-square w-32 rounded-2xl object-cover shadow-2xl md:-mb-20 md:w-60" src={product?.product_img} width={300} height={300} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="py-4 sm:py-0">
                        <h1 className="text-xs font-bold uppercase leading-7 tracking-wider sm:text-lg">{product?.product_name}</h1>
                        <p className="text-xs font-medium sm:text-base/6">{product?.product_provider}</p>
                        <div className="mt-4 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-8 sm:text-sm/6">
                            <div className="flex items-center gap-2">
                                {/* svg */}
                                <span>Proses Cepat</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* svg */}
                                <span>Proses Cepat</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* svg */}
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
                            <button className="flex w-full items-center justify-between rounded-lg bg-card/75 px-4 py-2 text-left text-xs font-medium text-card-foreground focus:outline-none">
                                <span>Deskripsi</span>
                            </button>
                        </div>
                        <div className="hidden lg:block">
                            {/* Ulasan */}
                        </div>
                    </div>
                </div>
                <div className="col-span-3 col-start-1 flex flex-col gap-4 mb-10 lg:col-span-2 lg:gap-8">
                    <section className="relative rounded-xl bg-card/50 shadow-2xl">
                        <div className="flex items-center overflow-hidden rounded-t-xl bg-[#7F8487]/60">
                            <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">
                                1
                            </div>
                            <h1 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">
                            Masukkan Data Akun
                            </h1>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="" className="block text-xs font-medium text-foreground pb-2">ID</label>
                                    <div className="flex flex-col items-start">
                                        <input onChange={(e) => setId(e.target.value)} type="number" placeholder="Masukkan ID" className="relative block w-full appearance-none rounded-lg border border-border bg-[#7F8487] px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                                    </div>
                                </div>
                                {product?.isServer && (
                                <div>
                                    <label htmlFor="" className="block text-xs font-medium text-foreground pb-2">Server</label>
                                    <div className="flex flex-col items-start">
                                        <input onChange={(e) => setServer(e.target.value)} type="number" placeholder="Masukkan Server" className="relative block w-full appearance-none rounded-lg border border-border bg-[#7F8487] px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                    </section>
                    <section className="relative rounded-xl bg-card/50 shadow-2xl">
            <div className="flex items-center overflow-hidden rounded-t-xl bg-accent/60">
                <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">
                    2
                </div>
                <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">Pilih nominal</h2>
            </div>
            <div className="p-4">
                <div className="flex flex-col space-y-4">
                    <section></section>
                    <section>
                        <h3 className="pb-4 text-sm/6 font-semibold text-card-foreground">Diamonds</h3>
                        <div>
                            <label className="sr-only">Select a variant list</label>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
                            {listProduct.map((data) => (
                                    <label key={data.code} htmlFor={`product-${data.code}`} className={`relative flex cursor-pointer rounded-xl p-2.5 text-background shadow-sm outline-none bg-accent/60 md:p-4 ${selectedProduct?.code === data.code ? 'ring-2 ring-offset-background ring-offset-2 ring-primary' : 'border-transparent'}`}>
                                        <input
                                            type="radio"
                                            id={`product-${data.code}`}
                                            name="product"
                                            value={data.code}
                                            checked={selectedProduct?.code === data.code}
                                            onChange={() => handleSelectProduct(data)}

                                            className="absolute opacity-0"
                                        />
                                        <span className="flex flex-1">
                                            <span className="flex flex-col justify-between text-white">
                                                <span className="block text-xs font-semibold">{data.name}</span>
                                                <div>
                                                    <span className={`mt-1 flex items-center text-xs ${selectedProduct?.code === data.code ? 'text-foreground' : 'text-foreground'} font-semibold`}>
                                                        {data.price.basic}
                                                    </span>
                                                </div>
                                            </span>
                                        </span>
                                    </label>
                                ))}
                                    </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>

                    <section className="relative scroll-mt-20 rounded-xl bg-card/50 shadow-2xl md:scroll-mt-[5.75rem]">
                        <div className="flex items-center overflow-hidden rounded-t-xl bg-accent/60">
                            <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">3</div>
                            <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">Kode Promo</h2>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-x-4">
                                    <div className="flex-1">
                                        <div className="flex flex-col items-start">
                                        <input type="text" placeholder="Masukkan Kode Voucher" className="relative block w-full appearance-none rounded-lg border border-border bg-[#7F8487] px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                                        </div>
                                    </div>
                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-3">Gunakan</button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="relative rounded-xl bg-card/50 shadow-2xl">
                        <div className="flex items-center overflow-hidden rounded-t-xl bg-accent/60">
                            <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">4</div>
                            <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">Pilih Pembayaran</h2>
                        </div>
                        <div className="p-4">
                            <div className="flex w-full flex-col space-y-4">
                                {listPayment.map((data) => (
                                    data.code === 'QRIS2' && (
                                        <div key={data.code} onClick={ !selectedProduct ? () => null : () => handleSelectPayment(data)} >
                                        <div id="radio-group" role="radio-group">
                                            <label className="sr-only" htmlFor="radio-1">Select an option</label>
                                            <div className="flex flex-col gap-4">
                                                <div className={`relative flex cursor-pointer rounded-lg border border-transparent bg-accent/75 p-2.5 text-white shadow-sm outline-none md:px-5 md:py-3 ${selectedPayment?.code === data.code ? 'ring-2 ring-primary ring-offset-2 ring-offset-background/60' : 'border-transparent'}`}>
                                                    <div className="flex w-full flex-col items-start justify-between py-1 md:items-center">
                                                        <div className="w-full">
                                                            <span className="block pb-2.5 text-xs font-semibold sm:text-sm">QRIS (All Payment)</span>
                                                            <img src="https://cdn.takapedia.com/common/d075c7ba-1b81-4d15-82be-61fd50a3b2f9.png" alt="" className="max-h-6" />

                                                        </div>
                                                        <div className="mt-3 w-full">
                                                            <div className="text-sm font-semibold sm:text-base w-full rounded-md border border-dashed py-1 text-center ">
                                                                <span className="w-full md:text-sm">
                                                                    { selectedProduct ? (selectedProduct?.normal_price.basic <= data.minimum_amount ? `Min. Rp ${data.minimum_amount.toLocaleString('id-ID')}` :  'Rp ' + ( selectedProduct.normal_price.basic + data.total_fee.flat + (selectedProduct?.normal_price.basic * parseFloat(data.total_fee.percent) / 100)).toLocaleString('id-ID', {maximumFractionDigits: 0}) ): (<span className="text-red-400">Min. Rp 100</span>) }
                                                                    
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                ))}

                                {/* E-wallet */}
                                <div className="flex w-full transform flex-col justify-between rounded-xl bg-accent/60 text-left text-sm font-medium duration-300 focus:outline-none">
                                    <button type="button" disabled={!selectedProduct} onClick={toggleCollapse1} className="w-full rounded-t-xl bg-card text-card-foreground disabled:opacity-75">
                                        <div className="flex w-full items-center justify-between px-4 py-2">
                                            <span className="transform text-sm/6 font-medium leading-7 duration-300">
                                                E-Wallet
                                            </span>
                                            <span className="ml-6 flex h-7 items-center">
                                                {isCollapsed1 ? <ChevronDown /> : <ChevronUp />}
                                            </span>
                                        </div>
                                    </button>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: isCollapsed1 ? 0 : 'auto' }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                        >
                                        <div className="px-4 pb-4 pt-2 text-sm">
                                        <div id="radio-group" role="radio-group">
                                            <label className="sr-only" htmlFor="radio-1">Select an option</label>
                                            <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
                                                {listPayment.map((data) => (
                                                        data.group.includes('E-Wallet') && data.code !== 'QRIS2' && (
                                                            <div key={data.code} onClick={() => handleSelectPayment(data)} className={`relative flex cursor-pointer rounded-xl bg-white/50 p-2.5 shadow-sm outline-none md:p-3 ${selectedPayment?.code === data.code ? 'ring-2 ring-primary ring-offset-2 ring-offset-background/60' : 'border-transparent'}`}>
                                                            <span className="flex w-full">
                                                                <span className="flex w-full flex-col justify-between">
                                                                    <div>
                                                                        <img className={`${selectedPayment?.code === data.code ? 'grayscale-0' : 'grayscale'}`} src={data.icon_url} alt="" width={40} />
                                                                    </div>
                                                                    <div className="flex w-full items-center justify-between">
                                                                        <div className="mt-2 w-full">
                                                                            <div className="mt-1.5 flex items-center gap-2">
                                                                                <div className="relative z-30 text-xs font-semibold leading-4 text-background">
                                                                                    { selectedProduct && (selectedProduct?.normal_price.basic <= data.minimum_amount ? `Min. Rp ${data.minimum_amount.toLocaleString('id-ID')}` :  'Rp ' + ( selectedProduct.normal_price.basic + data.total_fee.flat + (selectedProduct?.normal_price.basic * parseFloat(data.total_fee.percent) / 100)).toLocaleString('id-ID', {maximumFractionDigits: 0}) )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="mt-0.5 h-px w-full bg-border"></div>
                                                                            <div>
                                                                                <span className="block text-[0.625rem] italic text-background">
                                                                                Dicek Otomatis
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                        )
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: isCollapsed1 ? 'auto' : 0 }}
                                        transition={{ duration: 0.3, }}
                                        className="overflow-hidden"
                                    >
                                    <div className="transform max-h-screen">
                                        <div className="w-full rounded-b-xl bg-white/50 px-4 py-3">
                                            <div className="flex justify-end gap-x-2">
                                                <div className="relative aspect-[6/2] w-10">
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/1280px-Logo_dana_blue.svg.png" alt="Dana Logo" />
                                                </div>
                                                <div className="relative aspect-[6/2] w-10">
                                                    <img src="https://i.postimg.cc/VkWfmD46/shopepay.png" alt="ShopeePay Logo" />
                                                </div>
                                                <div className="relative aspect-[6/2] w-10">
                                                    <img src="https://i.pinimg.com/originals/28/fd/ed/28fdedc2022b5de9ae5a7f2507eb5f2d.png" alt="Ovo Logo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </motion.div>
                                </div>
                                
                                {/* Virtual Account */}
                                <div className="flex w-full transform flex-col justify-between rounded-xl bg-accent/60 text-left text-sm font-medium duration-300 focus:outline-none">
                                    <button type="button" disabled={!selectedProduct} onClick={toggleCollapse2} className="w-full rounded-t-xl bg-card text-card-foreground disabled:opacity-75">
                                        <div className="flex w-full items-center justify-between px-4 py-2">
                                            <span className="transform text-sm/6 font-medium leading-7 duration-300">
                                                Virtual Account
                                            </span>
                                            <span className="ml-6 flex h-7 items-center">
                                                {isCollapsed2 ? <ChevronDown /> : <ChevronUp />}
                                            </span>
                                        </div>
                                    </button>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: isCollapsed2 ? 0 : 'auto' }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                        >
                                        <div className="px-4 pb-4 pt-2 text-sm">
                                        <div id="radio-group" role="radio-group">
                                            <label className="sr-only" htmlFor="radio-1">Select an option</label>
                                            <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
                                                {listPayment.map((data) => (
                                                        data.group.includes('Virtual Account') && data.code !== 'QRIS2' && (
                                                            <div key={data.code} onClick={ selectedProduct && selectedProduct?.normal_price.basic <= data.minimum_amount ? () => handleSelectPayment(null) : () => handleSelectPayment(data)} className={`relative flex cursor-pointer rounded-xl bg-white/50 p-2.5 shadow-sm outline-none md:p-3 ${selectedPayment?.code === data.code ? 'ring-2 ring-primary ring-offset-2 ring-offset-background/60' : 'border-transparent'}`}>
                                                            <span className="flex w-full">
                                                                <span className="flex w-full flex-col justify-between">
                                                                    <div>
                                                                        <img className={`${selectedPayment?.code === data.code ? 'grayscale-0' : 'grayscale'}`} src={data.icon_url} alt="" width={40} />
                                                                    </div>
                                                                    <div className="flex w-full items-center justify-between">
                                                                        <div className="mt-2 w-full">
                                                                            <div className="mt-1.5 flex items-center gap-2">
                                                                            <div className={`relative z-30 text-xs font-semibold leading-4 ${selectedProduct && selectedProduct?.normal_price.basic <= data.minimum_amount ? 'text-red-700' : 'text-background'}`}>
                                                                                { selectedProduct && (selectedProduct?.normal_price.basic <= data.minimum_amount ? `Min. Rp ${data.minimum_amount.toLocaleString('id-ID')}` :  'Rp ' + ( selectedProduct.normal_price.basic + data.total_fee.flat + (parseFloat(data.total_fee.percent) * selectedProduct?.normal_price.basic / 100) ).toLocaleString('id-ID', {maximumFractionDigits: 0}) )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="mt-0.5 h-px w-full bg-border"></div>
                                                                            <div>
                                                                                <span className="block text-[0.625rem] italic text-background">
                                                                                Dicek Otomatis
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                        )
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: isCollapsed2 ? 'auto' : 0 }}
                                        transition={{ duration: 0.3, }}
                                        className="overflow-hidden"
                                    >
                                    <div className="transform max-h-screen">
                                        <div className="w-full rounded-b-xl bg-white/50 px-4 py-3">
                                            <div className="flex justify-end gap-x-2">
                                                <div className="relative aspect-[6/2] w-10">
                                                    <img src="https://assets.tripay.co.id/upload/payment-icon/8WQ3APST5s1579461828.png" alt="Briva Logo" />
                                                </div>
                                                <div className="relative aspect-[6/2] w-10">
                                                    <img src="https://assets.tripay.co.id/upload/payment-icon/ytBKvaleGy1605201833.png" alt="BCA Logo" />
                                                </div>
                                                <div className="relative aspect-[6/2] w-10">
                                                    <img src="https://assets.tripay.co.id/upload/payment-icon/n22Qsh8jMa1583433577.png" alt="BNI Logo" />
                                                </div>
                                                <div className="relative aspect-[6/2] w-10">
                                                    <img src="https://assets.tripay.co.id/upload/payment-icon/ZT91lrOEad1582929126.png" alt="MAYBANK Logo" />
                                                </div>
                                                <div className="relative aspect-[6/2] w-10">
                                                    <img src="https://assets.tripay.co.id/upload/payment-icon/szezRhAALB1583408731.png" alt="PERMATABANK Logo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </motion.div>
                                </div>

                                {/* Convenience Store */}
                                <div className="flex w-full transform flex-col justify-between rounded-xl bg-accent/60 text-left text-sm font-medium duration-300 focus:outline-none">
                                    <button type="button" disabled={!selectedProduct} onClick={toggleCollapse3} className="w-full rounded-t-xl bg-card text-card-foreground disabled:opacity-75">
                                        <div className="flex w-full items-center justify-between px-4 py-2">
                                            <span className="transform text-sm/6 font-medium leading-7 duration-300">
                                                Convenience Store
                                            </span>
                                            <span className="ml-6 flex h-7 items-center">
                                                {isCollapsed3 ? <ChevronDown /> : <ChevronUp />}
                                            </span>
                                        </div>
                                    </button>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: isCollapsed3 ? 0 : 'auto' }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                        >
                                        <div className="px-4 pb-4 pt-2 text-sm">
                                        <div id="radio-group" role="radio-group">
                                            <label className="sr-only" htmlFor="radio-1">Select an option</label>
                                            <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
                                                {listPayment.map((data) => (
                                                        data.group.includes('Convenience Store') && data.code !== 'QRIS2' && (
                                                            <div key={data.code} onClick={ selectedProduct && selectedProduct?.normal_price.basic <= data.minimum_amount ? () => handleSelectPayment(null) : () => handleSelectPayment(data)} className={`relative flex cursor-pointer rounded-xl bg-white/50 p-2.5 shadow-sm outline-none md:p-3 ${selectedPayment?.code === data.code ? 'ring-2 ring-primary ring-offset-2 ring-offset-background/60' : 'border-transparent'}`}>
                                                            <span className="flex w-full">
                                                                <span className="flex w-full flex-col justify-between">
                                                                    <div>
                                                                        <img className={`${selectedPayment?.code === data.code ? 'grayscale-0' : 'grayscale'}`} src={data.icon_url} alt="" width={40} />
                                                                    </div>
                                                                    <div className="flex w-full items-center justify-between">
                                                                        <div className="mt-2 w-full">
                                                                            <div className="mt-1.5 flex items-center gap-2">
                                                                                <div className={`relative z-30 text-xs font-semibold leading-4 ${selectedProduct && selectedProduct?.normal_price.basic <= data.minimum_amount ? 'text-red-700' : 'text-background'}`}>
                                                                                    { selectedProduct && (selectedProduct?.normal_price.basic <= data.minimum_amount ? `Min. Rp ${data.minimum_amount.toLocaleString('id-ID')}` :  'Rp ' + ( selectedProduct.normal_price.basic + data.total_fee.flat + (parseFloat(data.total_fee.percent) * selectedProduct?.normal_price.basic / 100) ).toLocaleString('id-ID') )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="mt-0.5 h-px w-full bg-border"></div>
                                                                            <div>
                                                                                <span className="block text-[0.625rem] italic text-background">
                                                                                Dicek Otomatis
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </span>
                                                            </span>
                                                        </div>
                                                        )
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: isCollapsed3 ? 'auto' : 0 }}
                                        transition={{ duration: 0.3, }}
                                        className="overflow-hidden"
                                    >
                                    <div className="transform max-h-screen">
                                        <div className="w-full rounded-b-xl bg-white/50 px-4 py-3">
                                            <div className="flex justify-end gap-x-2">
                                                <div className="relative aspect-[6/2] w-10">
                                                    <img src="https://assets.tripay.co.id/upload/payment-icon/jiGZMKp2RD1583433506.png" alt="ALFA Logo" />
                                                </div>
                                                <div className="relative aspect-[6/2] w-10">
                                                    <img src="https://assets.tripay.co.id/upload/payment-icon/zNzuO5AuLw1583513974.png" alt="INDOMART Logo" />
                                                </div>
                                                <div className="relative aspect-[6/2] w-10">
                                                    <img src="https://assets.tripay.co.id/upload/payment-icon/aQTdaUC2GO1593660384.png" alt="ALFAMIDI Logo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </motion.div>
                                </div>
                                
                            </div>
                        </div>
                    </section>

                    <section className="relative scroll-mt-20 rounded-xl bg-card/50 shadow-2xl md:scroll-mt-[5.75rem]">
                        <div className="flex items-center overflow-hidden rounded-t-xl bg-accent/60">
                            <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">5</div>
                            <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">Detail Kontak</h2>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label className="block text-xs font-medium text-foreground">No. WhatsApp</label>
                                    <div>
                                        <PhoneInput
                                        defaultCountry="id"
                                        inputStyle={{ width: '100%' }}
                                        value={phone}
                                        style={{
                                            width: '100%',
                                        }}
                                        onChange={(phone : any) => setPhone(phone)}
                                        />
                                    </div>
                                    <span className="text-xs italic text-card-foreground">**Nomor ini akan dihubungi jika terjadi masalah</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    {!selectedProduct ? (
                        <div className="bottom-0 pb-4 flex flex-col gap-4 bg-background">
                        <div className="rounded-lg border border-dashed bg-secondary p-4 text-sm text-secondary-foreground">
                            <div className="text-center">
                            Belum ada item produk yang dipilih.
                            </div>
                        </div>
                        <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-3 w-full gap-2">
                                <span>
                                    Pesan Sekarang!
                                </span>
                        </button>
                    </div>
                    ): (
                        <div className="sticky bottom-0 pb-4 flex flex-col gap-4 bg-background">
                        <div className="rounded-lg border border-dashed bg-secondary p-4 text-sm text-secondary-foreground">
                            <div className="flex items-center gap-4">
                                <div>
                                    <img src={product?.product_img} alt="" className="rounded" width={50} />
                                </div>
                                <div>
                                    <div className="text-sm font-medium">{selectedProduct?.name}</div>
                                    <div className="text-sm text-foreground/50">{!totalPrice ? selectedProduct?.price.basic : 'Rp ' + totalPrice} {selectedPayment && '- ' + selectedPayment?.name}</div>
                                    <span className="text-[0.625rem] italic text-card-foreground">**Proses Otomatis</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={submitOrder} disabled={isLoading} className="inline-flex items-center justify-center whitespace-nowrap text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-3 w-full gap-2">
                        {isLoading ? (
                                <div className="loader border-t-transparent border-solid border-white border-4 rounded-full w-4 h-4 animate-spin"></div> 
                            ) : (
                                <span>Pesan Sekarang!</span>
                        )}
                        </button>
                        
                        <Transition show={isModalOpen} as={Fragment}>
                            <Dialog
                                open={isModalOpen}
                                onClose={() => setModalOpen(true)}
                                className="relative z-50"
                            >
                        <div className="fixed inset-0 bg-background bg-opacity-50" aria-hidden="true" />

                        <div className="fixed bottom-0 sm:inset-0 flex w-screen items-center justify-center p-4">
                            <motion.div
                                initial={{ y: '100%', opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: '100%', opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.25, 0.8, 0.5, 1] }}
                                className="mx-auto max-w-sm w-full rounded-lg bg-accent p-4"
                            >
                            <Dialog.Panel>
                            <Dialog.Title className={'flex-1 text-lg items-center mb-2 justify-center text-center'}>
                                <div className="flex items-center justify-center mb-2"><CheckCircle color="#00FF00" size={50} /></div>
                                <h1 className="font-bold">Buat Pesanan</h1>
                                <span className="text-sm">Pastikan data anda sudah benar!</span>
                            </Dialog.Title>
                            <Dialog.Description className={'text-sm bg-background mb-4 rounded-lg p-4'}>
                                <div className="flex flex-col gap-2">
                                    {product?.isCheckUsername && (
                                        <div className="flex flex-row">
                                        <span className="w-24">Username</span>
                                        <span className="w-4 text-center">:</span>
                                        <span>{username}</span>
                                    </div>
                                    )}
                                    <div className="flex flex-row">
                                        <span className="w-24">id</span>
                                        <span className="w-4 text-center">:</span>
                                        <span>{id}</span>
                                    </div>
                                    {product?.isServer && (
                                        <div className="flex flex-row">
                                        <span className="w-24">server</span>
                                        <span className="w-4 text-center">:</span>
                                        <span>{server}</span>
                                    </div>
                                    )}
                                    <div className="flex flex-row">
                                        <span className="w-24">Item</span>
                                        <span className="w-4 text-center">:</span>
                                        <span className="w-36">{selectedProduct?.name}</span>
                                    </div>
                                    <div className="flex flex-row">
                                        <span className="w-24">Produk</span>
                                        <span className="w-4 text-center">:</span>
                                        <span>{product?.product_name}</span>
                                    </div>
                                    <div className="flex flex-row">
                                        <span className="w-24">Payment</span>
                                        <span className="w-4 text-center">:</span>
                                        <span>{selectedPayment?.name}</span>
                                    </div>
                                </div>
                            </Dialog.Description>
                            <div className="flex items-center justify-between gap-2">
                            <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border/100 bg-transparent px-2 py-2 text-sm font-semibold text-foreground duration-300 ease-in-out hover:bg-muted/50" onClick={() => {setModalOpen(false), setIsLoading(false)}}>Batal </button>
                            <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border/100 bg-transparent px-2 py-2 text-sm font-semibold text-foreground duration-300 ease-in-out hover:bg-muted/50" ref={completeButtonRef} onClick={completeOrder}>
                                Pesan Sekarang
                            </button>
                        </div>
                        </Dialog.Panel>
                    </motion.div>
                </div>
            </Dialog>
        </Transition>
            </div>)}        
            </div>
            </div>
            <div className="z-40">
                <Toaster />
            </div>
        </main>
    )
}

export default DetailProduct