'use client'
import axios from "axios"
import { useEffect, useState } from "react"

const DetailProduct = ({ params }: { params: { lang: string, slug: string} }) =>{
    const slug = params.slug
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const [product, setProduct] = useState<Product>();
    const [listProduct, setListProduct] = useState<ListProduk[]>([]);
    
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
                <form action="#" className="col-span-3 col-start-1 flex flex-col gap-4 mb-10 lg:col-span-2 lg:gap-8">
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
                                        <input type="text" placeholder="Masukkan ID" className="relative block w-full appearance-none rounded-lg border border-border bg-[#7F8487] px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="block text-xs font-medium text-foreground pb-2">Server</label>
                                    <div className="flex flex-col items-start">
                                        <input type="text" placeholder="Masukkan Server" className="relative block w-full appearance-none rounded-lg border border-border bg-[#7F8487] px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                                    </div>
                                </div>
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
                                                <div key={data.id} className="relative flex cursor-pointer rounded-xl border border-transparent bg-accent/75 p-2.5 text-background shadow-sm outline-none md:p-4 bg-order-variant-background text-order-variant-foreground">
                                                <span className="flex flex-1">
                                                    <span className="flex flex-col justify-between text-white">
                                                        <span className="block text-xs font-semibold">{data.name}</span>
                                                        <div>
                                                            <span className="mt-1 flex items-center text-xs text-foreground font-semibold">
                                                                {data.price.basic}
                                                            </span>
                                                        </div>
                                                    </span>
                                                </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                    <section className="relative rounded-xl bg-card/50 shadow-2xl">
                        <div className="flex items-center overflow-hidden rounded-t-xl bg-accent/60">
                            <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">3</div>
                            <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">Pilih Pembayaran</h2>
                        </div>
                        <div className="p-4">
                            <div className="flex w-full flex-col space-y-4">
                                <div>
                                    <div id="radio-group" role="radio-group">
                                        <label className="sr-only" htmlFor="radio-1">Select an option</label>
                                        <div className="flex flex-col gap-4">
                                            <div className="relative flex cursor-pointer rounded-lg border border-transparent bg-accent/75 p-2.5 text-white shadow-sm outline-none md:px-5 md:py-3">
                                                <div className="flex w-full flex-col items-start justify-between py-1 md:items-center">
                                                    <div className="w-full">
                                                        <span className="block pb-2.5 text-xs font-semibold sm:text-sm">QRIS (All Payment)</span>
                                                        <img src="https://cdn.takapedia.com/common/d075c7ba-1b81-4d15-82be-61fd50a3b2f9.png" alt="" className="max-h-6" />
                                                        
                                                    </div>
                                                    <div className="mt-3 w-full">
                                                            <div className="text-sm font-semibold sm:text-base w-full rounded-md border border-dashed py-1 text-center ">
                                                            <span className="w-full md:text-sm">
                                                                Rp 100.000
                                                            </span>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full transform flex-col justify-between rounded-xl bg-accent/60 text-left text-sm font-medium duration-300 focus:outline-none">
                                    <button className="w-full rounded-t-xl bg-card text-card-foreground disabled:opacity-75">
                                        <div className="flex w-full items-center justify-between px-4 py-2">
                                            <span className="transform text-sm/6 font-medium leading-7 duration-300">
                                                E-Wallet
                                            </span>
                                            <span className="ml-6 flex h-7 items-center">
                                                arrowbove
                                            </span>
                                        </div>
                                    </button>
                                    <div className="overflow-hidden transform max-h-screen">
                                        <div className="w-full rounded-b-xl bg-white/50 px-4 py-3">
                                            <div className="flex justify-end gap-x-2">
                                                <div className="relative aspect-[6/2] w-10">
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/1280px-Logo_dana_blue.svg.png" alt="Dana Logo" />
                                                </div>
                                                <div className="relative aspect-[6/2] w-10">
                                                    <img src="https://antinomi.org/wp-content/uploads/2022/03/logo-gopay-vector.png" alt="Gopay Logo" />
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
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="relative scroll-mt-20 rounded-xl bg-card/50 shadow-2xl md:scroll-mt-[5.75rem]">
                        <div className="flex items-center overflow-hidden rounded-t-xl bg-accent/60">
                            <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">4</div>
                            <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">Detail Kontak</h2>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label className="block text-xs font-medium text-foreground">No. WhatsApp</label>
                                    <div>
                                        <div className="react-international-phone-input-container">

                                        </div>
                                    </div>
                                    <span className="text-xs italic text-card-foreground">**Nomor ini akan dihubungi jika terjadi masalah</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="sticky bottom-0 pb-4 flex flex-col gap-4 bg-background">
                        <div className="rounded-lg border border-dashed bg-secondary p-4 text-sm text-secondary-foreground">
                            <div className="text-center">
                            Belum ada item produk yang dipilih.
                            </div>
                        </div>
                        <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-3 w-full gap-2">
                                <span className="">
                                    Pesan Sekarang!
                                </span>
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default DetailProduct