
const invoicePage = () => {

    return ( 
        <section className="min-h-[100vh] bg-gradient-secondary">
            <div className="space-y-12">
                <div className="relative overflow-hidden shadow-2xl">

                </div>
                <form className="container relative z-20 py-12 text-left" action="#">
                    <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Cari Pesanan
                    </h2>
                    <p className="mt-3 max-w-3xl text-foreground">Lacak transaksi kamu dengan cara memasukkan Nomor Invoice dibawah ini:</p>
                    <div className="mt-6 max-w-xl">
                        <label htmlFor="invoice" className="block text-xs font-medium text-foreground mb-2 text-left">Nomor Invoice Kamu</label>
                        <div className="flex flex-col items-start">
                            <input type="text" name="" id="" className="relative block w-full appearance-none rounded-lg border border-border bg-input px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75 " />
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-start gap-x-6">
                        <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75 disabled:cursor-not-allowed disabled:opacity-75 space-x-2 !pl-3 !pr-4">Cari</button>
                    </div>
                </form>
            </div>
        </section>
     )
}

export default invoicePage