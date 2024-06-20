

type Props = {
    params: { surah: string };
};


const DetailProduct = async ({ params }: { params: { lang: string, slug: string} }) =>{
    const slug = params.slug
    return(
        <main className="relative bg-gradient-secondary">
            <div className="relative h-56 w-full bg-muted lg:h-[340px]">
                {/* <img src="https://via.placeholder.com/800x400" alt="" /> */}
            </div>
            <div className="bg-title-product flex min-h-32 w-full items-center border-y bg-muted lg:min-h-[160px] bg-order-header-image bg-cover bg-center">
                <div className="container flex items-center gap-2">
                    <div>
                        <div className="flex items-start gap-4">
                            <div className="product-thumbnail-container relative -top-28">
                                <img className="z-20 -mb-14 aspect-square w-32 rounded-2xl object-cover shadow-2xl md:-mb-20 md:w-60" src="https://www.takapedia.com/_next/image?url=https%3A%2F%2Fcdn.takapedia.com%2F1e1016e8-4847-49c8-8141-51ac4a9e03e0.webp&w=1920&q=75" width={300} height={300} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="py-4 sm:py-0">
                        <h1 className="text-xs font-bold uppercase leading-7 tracking-wider sm:text-lg">Mobile Legends</h1>
                        <p className="text-xs font-medium sm:text-base/6">Mooonton</p>
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
                        <div className="flex items-center overflow-hidden rounded-t-xl bg-muted/60">
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
                                        <input type="text" placeholder="Masukkan ID" className="relative block w-full appearance-none rounded-lg border border-border bg-input px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="block text-xs font-medium text-foreground pb-2">Server</label>
                                    <div className="flex flex-col items-start">
                                        <input type="text" placeholder="Masukkan Server" className="relative block w-full appearance-none rounded-lg border border-border bg-input px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="relative rounded-xl bg-card/50 shadow-2xl">
                        <div className="flex items-center overflow-hidden rounded-t-xl bg-muted/60">
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
                                            <div className="relative flex cursor-pointer rounded-xl border border-transparent bg-muted/75 p-2.5 text-background shadow-sm outline-none md:p-4 bg-order-variant-background text-order-variant-foreground">
                                                <span className="flex flex-1">
                                                    <span className="flex flex-col justify-between">
                                                        <span className="block text-xs font-semibold ">DM</span>
                                                        <div>
                                                            <span className="mt-1 flex items-center text-xs font-semibold">
                                                                harga
                                                            </span>
                                                        </div>
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="relative flex cursor-pointer rounded-xl border border-transparent bg-muted/75 p-2.5 text-background shadow-sm outline-none md:p-4 bg-order-variant-background text-order-variant-foreground">
                                                <span className="flex flex-1">
                                                    <span className="flex flex-col justify-between">
                                                        <span className="block text-xs font-semibold ">DM</span>
                                                        <div>
                                                            <span className="mt-1 flex items-center text-xs font-semibold">
                                                                harga
                                                            </span>
                                                        </div>
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                    <section className="relative rounded-xl bg-card/50 shadow-2xl">
                        <div className="flex items-center overflow-hidden rounded-t-xl bg-card">
                            <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">3</div>
                            <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">Pilih Pembayaran</h2>
                        </div>
                        <div className="p-4">
                            <div className="flex w-full flex-col space-y-4">
                                <div>
                                    <div id="radio-group" role="radio-group">
                                        <label className="sr-only" htmlFor="radio-1">Select an option</label>
                                        <div className="flex flex-col gap-4">
                                            <div className="relative flex cursor-pointer rounded-lg border border-transparent bg-foreground/75 p-2.5 text-background shadow-sm outline-none md:px-5 md:py-3">
                                                <div className="flex w-full flex-col items-start justify-between py-1 md:flex-row md:items-center">
                                                    <div>
                                                        <span className="block pb-2.5 text-xs font-semibold sm:text-sm">QRIS (All Payment)</span>
                                                        <img src="https://cdn.takapedia.com/common/d075c7ba-1b81-4d15-82be-61fd50a3b2f9.png" alt="" className="max-h-6" />
                                                    </div>
                                                    <div className="mt-3 w-full md:mt-0">
                                                        <div className="relative mr-8 text-sm font-semibold sm:text-base w-full rounded-md border border-dashed py-1 text-center md:w-auto md:border-none md:text-right">
                                                        Rp  606.000
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </main>
    )
}

export default DetailProduct