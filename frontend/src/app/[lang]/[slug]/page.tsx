

type Props = {
    params: { surah: string };
};


const DetailProduct = async ({ params }: { params: { lang: string, slug: string} }) =>{
    const slug = params.slug
    return(
        <main className="relative bg-gradient-secondary">
            <div className="relative h-56 w-full bg-muted lg:h-[340px]">
                <img src="https://via.placeholder.com/800x400" alt="" />
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
                <form action="#" className="col-span-3 col-start-1 flex flex-col gap-4 lg:col-span-2 lg:gap-8">
                    <section className="relative rounded-xl bg-card/50 shadow-2xl">
                        <div className="flex items-center overflow-hidden rounded-t-xl bg-card">
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
                        <div className="flex items-center overflow-hidden rounded-t-xl bg-card">
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
                                </section>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </main>
    )
}

export default DetailProduct