"use client"	
import calculateTotalWithFee from "@/utils/calculateWithFee"
import { Dialog, Transition } from '@headlessui/react'
import axios from "axios"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, CheckCircle, ShoppingBag, TicketPercent, X } from "lucide-react"
import { Fragment, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
type Props = {
    params: {
      lang: string;
      slug: string;
    };
    product: Product;
    listProduct: ListProduk[];
    listPayment: ListPayment[];
    dict: any
  };
//   {slug:string, product:Product, listPayment:ListPayment[], listProduct:ListProduk[]}
export default function Form({params, product, listProduct, listPayment, dict }: Props) {
    const { lang } = params
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const [id, setId] = useState('')
    const [server, setServer] = useState('')
    const [username, setUsername] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<ListProduk>();
    const [selectedPayment, setSelectedPayment] = useState<ListPayment>();
    const [promoCode, setPromoCode] = useState('');
    const [promoCodeData, setPromoCodeData] = useState<Promo>();
    const [totalPrice, setTotalPrice] = useState('');
    const [isCollapsed1, setIsCollapsed1] = useState(true);
    const [isCollapsed2, setIsCollapsed2] = useState(true);
    const [isCollapsed3, setIsCollapsed3] = useState(true);
    const [phone, setPhone] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPromo, setIsLoadingPromo] = useState(false);
    const [specialItems, setSpecialItems] = useState<ListProduk[]>([]);
    const [initialSpecialItems, setInitialSpecialItems] = useState<ListProduk[]>([]);
    const lowestPricedProducts = Object.values(
        listProduct.reduce((acc: { [key: string]: ListProduk }, product) => {
          const name = product.name;
          if (!acc[name] || product.price.basic < acc[name].price.basic) {
            acc[name] = product;
          }
          return acc;
        }, {})
      );

    useEffect(() => {
        let specialItems = product.isSpecial ? lowestPricedProducts.filter((produk) => product.product_special.includes(produk.name)) : []
        setSpecialItems(specialItems)
        setInitialSpecialItems(specialItems)
    }, []);    

    const Items = product.isSpecial ? lowestPricedProducts.filter((produk) => !product.product_special.includes(produk.name)) : lowestPricedProducts;    

    const notifyError = (msg: string) => toast.error(msg);
    const notifySuccess = (msg: string) => toast.success(msg);
    let completeButtonRef = useRef(null)

    async function handleApplyPromo () {
        if (id === '') {
            notifyError('Silahkan lengkapi data akun terlebih dahulu');
            window.scrollTo({ top: 200, behavior: 'smooth' });
        } else if (product?.isServer && server === '') {
            notifyError('Silahkan lengkapi data akun terlebih dahulu');
            window.scrollTo({ top: 200, behavior: 'smooth' });
        } else if (selectedProduct === undefined) {
            notifyError('Silahkan pilih item terlebih dahulu');
        } else if (promoCodeData){
            notifyError('Kode promo sedang digunakan')
        } else {
            if (promoCode === '') {
                notifyError('Silahkan masukkan kode promo terlebih dahulu');
            } else {
                setIsLoadingPromo(true);
                try {
                    const form = {
                        code: promoCode,
                        productCode: selectedProduct.name,
                        id: id,
                        productPrice: selectedProduct.normal_price.basic
                    }
                    const data = await axios.post(`${API_URL}/promo/apply`, form );
                    console.log(data);
                    
                    if (data.data.status === true) {
                        // setTotalPrice(data.data);                        
                        setPromoCodeData(data.data.data);
                        notifySuccess(data.data.message);
                        setSpecialItems((prevItems) =>
                            prevItems.map((item) => ({
                              ...item,
                              normal_price: {
                                ...item.normal_price,
                                basic: data.data.data.productNewPrice,
                              },
                            }))
                          );
                        setSelectedProduct(undefined)
                        setPromoCode('');
                        setIsLoadingPromo(false);
                    } else {
                        notifyError(data.data.message);
                        setIsLoadingPromo(false);
                    }
                } catch (error: any) {
                    console.log(error);
                    notifyError(error.message);
                    setIsLoadingPromo(false);
                }
            }
        }
    }
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
                    setIsLoading(false);
                    return;
                }
            }
            setModalOpen(true);
        }
    }
    
    async function completeOrder() {
        const data = await addOrder();
        setId('');
        setServer('');
        setPhone('');
        if(data){
            setModalOpen(false);
            window.location.href = lang === 'id' ? '/id/invoice/' + data.data.merchant_ref : '/en/invoice/' + data.data.merchant_ref
        } else {
            setModalOpen(false);
            setIsLoading(false);
            notifyError('Terjadi kesalahan, silahkan coba sesaat lagi');
            setId('');
            setServer('');
            setPhone('');
        }
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

    async function checkUsername(code: string, id: string, server: string) {
        const data = {
            code: code,
            id: id,
            server: server
        };
    
        try {
            const response = await axios.post(`${API_URL}/account/check-game`, data);
            return response.data.data;
            
        } catch (error) {
            console.error("Error fetching account", error);
            return null; 
        }
    }

    const addOrder = async () => {
        setIsLoading(true);
        const data = {
            userid: id,
            userserver: server,
            username: username,
            amount: selectedProduct?.normal_price.basic,
            harga: totalPrice,
            method: selectedPayment?.code,
            customer_phone: phone,
            produk: product?.product_name,
            item: selectedProduct?.name,
            payment_name: selectedPayment?.name,
            payment_code: selectedPayment?.code,
            payment_grup: selectedPayment?.group,
            nomor_whatsapp: phone,
            kode_game: selectedProduct?.code,
            kode_promo: promoCodeData?.code
        }

        try {
            const response = await axios.post(`${API_URL}/invoice/add`, data);
            setIsLoading(false);
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
    const handleSelectProduct = (product: any) => {
        setSelectedProduct(product);
        
        const applicablePayment = listPayment.find(
            (data) =>
                (data.group.includes(`${selectedPayment?.group}`))&&
                data.code === `${selectedPayment?.code}`
        );

        if (applicablePayment) {
            if (applicablePayment.group === 'E-Wallet' && applicablePayment.code !== 'QRIS2') {
                setTotalPrice(( product && product.normal_price.basic + 1000).toLocaleString('id-ID', { maximumFractionDigits: 0} ))
            } else {
                const totalPrice = calculateTotalWithFee(product.normal_price.basic, applicablePayment.total_fee).toLocaleString('id-ID', { maximumFractionDigits: 0} );
                setTotalPrice(totalPrice);
            }
        }
    };
    const handleSelectPayment = (payment: any) => {
        setSelectedPayment(payment);
        if(selectedProduct){
            if (payment.group === 'E-Wallet' && payment.code !== 'QRIS2') {
                setTotalPrice(( selectedProduct && selectedProduct?.normal_price.basic + 1000).toLocaleString('id-ID', { maximumFractionDigits: 0} ))
            } else {
                setTotalPrice(( selectedProduct && selectedProduct?.normal_price.basic + payment.total_fee.flat + (parseFloat(payment.total_fee.percent) * selectedProduct?.normal_price.basic / 100) ).toLocaleString('id-ID', { maximumFractionDigits: 0} ))
            }
        }
    };
    
    return (
        <div className="col-span-3 col-start-1 flex flex-col gap-4 mb-10 lg:col-span-2 lg:gap-8">
                    <section className="relative rounded-xl bg-card/50 shadow-2xl">
                        <div className="flex items-center overflow-hidden rounded-t-xl bg-[#7F8487]/60">
                            <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">
                                1
                            </div>
                            <h1 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">
                                {dict.numone}
                            </h1>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="" className="block text-xs font-medium text-foreground pb-2">ID</label>
                                    <div className="flex flex-col items-start">
                                        <input onChange={(e) => setId(e.target.value)} type="number" value={id} placeholder={`${dict.typeid}`} className="relative block w-full appearance-none rounded-lg border border-border bg-[#7F8487] px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                                    </div>
                                </div>
                                {product?.isServer && (
                                <div>
                                    <label htmlFor="" className="block text-xs font-medium text-foreground pb-2">Server</label>
                                    <div className="flex flex-col items-start">
                                        <input onChange={(e) => setServer(e.target.value)} value={server} type="number" placeholder={`${dict.typeserver}`} className="relative block w-full appearance-none rounded-lg border border-border bg-[#7F8487] px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
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
                <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">{dict.numtwo}</h2>
            </div>
            <div className="p-4">
                <div className="flex flex-col space-y-4">
                    <section>
                    {product.isSpecial && (
                        <><h3 className="pb-4 text-sm/6 font-semibold text-card-foreground">Special Items</h3><div>
                                    <label className="sr-only">Select a variant list</label>
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
                                        {specialItems.map((data) => (
                                            <label key={data.code} htmlFor={`product-${data.code}`} className={`relative flex cursor-pointer rounded-xl p-2.5 text-background shadow-sm outline-none bg-accent/60 md:p-4 ${selectedProduct?.code === data.code ? 'ring-2 ring-offset-background ring-offset-2 ring-primary' : 'border-transparent'}`}>
                                                <input
                                                    type="radio"
                                                    id={`product-${data.code}`}
                                                    name="product"
                                                    value={data.code}
                                                    checked={selectedProduct?.code === data.code}
                                                    onChange={() => handleSelectProduct(data)}

                                                    className="absolute opacity-0" />
                                                <span className="flex flex-1">
                                                    <span className="flex flex-col justify-between text-white">
                                                        <span className="block text-xs font-semibold">{data.name}</span>
                                                        <div>
                                                            {promoCodeData ? (
                                                                <>
                                                                    <span className="flex items-center text-xs font-semibold italic line-through decoration-[0.9px] text-muted-foreground decoration-destructive">
                                                                        {data.price.basic}
                                                                    </span>
                                                                    <span className='mt-1 flex items-center text-xs font-semibold text-primary'>
                                                                        {promoCodeData.productNewPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}
                                                                    </span>
                                                                    <div className="w-[4rem] absolute aspect-square -top-[9px] -right-[9px] overflow-hidden rounded-sm">
                                                                        <div className="absolute top-0 left-0 bg-primary/50 h-2 w-2"></div>
                                                                        <div className="absolute bottom-0 right-0 bg-primary/50 h-2 w-2"></div>
                                                                        <div className="absolute block w-square-diagonal py-1 text-center text-[0.7rem] font-semibold uppercase bottom-0 w-[90px] right-0 rotate-45 origin-bottom-right shadow-sm bg-primary text-primary-foreground">
                                                                        &nbsp;{promoCodeData.discount}% off &nbsp;
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ): (
                                                                <>
                                                                    <span className='mt-1 flex items-center text-xs font-semibold'>
                                                                        {data.price.basic}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </span>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div></>
                    )}
                    </section>
                    <section>
                        <h3 className="pb-4 text-sm/6 font-semibold text-card-foreground">Diamonds</h3>
                        <div>
                            <label className="sr-only">Select a variant list</label>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
                            {Items.map((data) => (
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
                            <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">{dict.numthree}</h2>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-x-4">
                                    <div className="flex-1">
                                        <div className="flex flex-col items-start">
                                        <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder={`${dict.typepromo}`} className="relative block w-full appearance-none rounded-lg border border-border bg-[#7F8487] px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                                        </div>
                                    </div>
                                    <button onClick={handleApplyPromo} disabled={isLoadingPromo} className="inline-flex items-center justify-center whitespace-nowrap text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-3">{isLoadingPromo ?  <div className="loader border-t-transparent border-solid border-white border-4 rounded-full w-4 h-4 animate-spin"></div> : dict.apply}</button>
                                </div>
                                {promoCodeData && 
                                <>
                                    <div className="flex items-center gap-x-4">
                                        <div className="flex-1">
                                            <div className="flex flex-col">
                                                <button className="inline-flex items-center justify-center whitespace-nowrap text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-3">
                                                   <TicketPercent className="h-4 w-4 mr-1" /> {promoCodeData.code}
                                                </button>
                                            </div>
                                        </div>
                                        <X className="h-4 w-4 inline-flex items-center justify-center whitespace-nowrap" onClick={() => {
                                            setSpecialItems(initialSpecialItems)
                                            setPromoCodeData(undefined) 
                                            setSelectedProduct(undefined)
                                        }} />
                                    </div>
                                </>}
                            </div>
                        </div>
                    </section>

                    <section className="relative rounded-xl bg-card/50 shadow-2xl">
                        <div className="flex items-center overflow-hidden rounded-t-xl bg-accent/60">
                            <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">4</div>
                            <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">{dict.numfour}</h2>
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
                                                                                    { selectedProduct && (selectedProduct?.normal_price.basic <= data.minimum_amount ? `Min. Rp ${data.minimum_amount.toLocaleString('id-ID')}` :  'Rp ' + ( selectedProduct.normal_price.basic + 1000).toLocaleString('id-ID', {maximumFractionDigits: 0}) )}
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
                            <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">{dict.numfive}</h2>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label className="block text-xs font-medium text-foreground">No. WhatsApp</label>
                                    <div>
                                        <input onChange={(e) => setPhone(e.target.value)} value={phone} type="number" placeholder="085xxxxxxxx" className="relative block w-full appearance-none rounded-lg border border-border bg-[#7F8487] px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                                    </div>
                                    <span className="text-xs italic text-card-foreground">**{dict.numerror}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    {!selectedProduct ? (
                        <div className="bottom-0 pb-4 flex flex-col gap-4 bg-background">
                        <div className="rounded-lg border border-dashed bg-secondary p-4 text-sm text-secondary-foreground">
                            <div className="text-center">
                                {dict.selectproduct}
                            </div>
                        </div>
                        <button type="submit" disabled={!selectedProduct} className="inline-flex items-center justify-center whitespace-nowrap text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-3 w-full gap-2">
                                <ShoppingBag className="h-4 w-4" />
                                <span>{dict.order}</span>
                        </button>
                    </div>
                    ): (
                        <div className="sticky bottom-0 pb-4 flex flex-col gap-4 bg-background">
                        <div className="rounded-lg border border-dashed bg-secondary p-4 text-sm text-secondary-foreground">
                            <div className="flex items-center gap-4">
                                <div>
                                    <img src={product?.product_img} alt="" className="rounded aspect-square object-cover h-16 w-16"  />
                                </div>
                                <div>
                                    <div className="text-sm font-medium">{selectedProduct?.name}</div>
                                    <div className="text-sm text-foreground/50">{!totalPrice ? "Rp " + selectedProduct?.normal_price.basic.toLocaleString('id-ID') : 'Rp ' + totalPrice} {selectedPayment && '- ' + selectedPayment?.name}</div>
                                    <span className="text-[0.625rem] italic text-card-foreground">**Proses Otomatis</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={submitOrder} disabled={isLoading} className="inline-flex items-center justify-center whitespace-nowrap text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-3 w-full gap-2">
                        {isLoading ? (
                                <div className="loader border-t-transparent border-solid border-white border-4 rounded-full w-4 h-4 animate-spin"></div> 
                            ) : (
                                <><ShoppingBag className="h-4 w-4" /><span>{dict.order}</span></>
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
                                <h1 className="font-bold">{dict.ordertitle}</h1>
                                <span className="text-sm">{dict.orderdesc}</span>
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
                            <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-muted/60 px-2 py-2 text-sm font-semibold text-foreground duration-300 ease-in-out hover:bg-muted/50" onClick={() => {setModalOpen(false), setIsLoading(false)}}>{dict.cancel} </button>
                            <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-2 py-2 text-sm font-semibold text-foreground duration-300 ease-in-out hover:bg-primary/50" ref={completeButtonRef} onClick={completeOrder}>
                            {isLoading ? (
                                <div className="loader border-t-transparent border-solid border-white border-4 rounded-full w-4 h-4 animate-spin"></div> 
                            ) : (
                                <span>{dict.order}</span>
                            )}
                            </button>
                        </div>
                        </Dialog.Panel>
                    </motion.div>
                </div>
            </Dialog>
        </Transition>
            </div>)}        
            </div>
    )
}