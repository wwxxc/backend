'use client'
import { Search } from "lucide-react"
import { useState } from "react"

const invoicePage = () => {
    const [invoice, setInvoice] = useState('')
    const [isLoading, setIsLoading] = useState(false)    
    const fetchInvoice = async () => {
        window.location.href = '/invoice/' + invoice
    }

    const submitbtn = () => {
        if (invoice !== '') {
            setIsLoading(true)
            fetchInvoice()
        }
    }
    
    return ( 
        <section className="bg-[#393E46]">
            <div className="space-y-12">
                <div className="relative overflow-hidden shadow-2xl">

                </div>
                <div className="container relative z-20 py-12 text-left">
                    <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Cari Pesanan
                    </h2>
                    <p className="mt-3 max-w-3xl text-foreground">Lacak transaksi kamu dengan cara memasukkan Nomor Invoice dibawah ini:</p>
                    <div className="mt-6 max-w-xl">
                        <label htmlFor="invoice" className="block text-xs font-medium text-foreground mb-2 text-left">Nomor Invoice Kamu</label>
                        <div className="flex flex-col items-start">
                            <input type="text" placeholder="EPOXXXXXXXXXXXX" name="" id="" onChange={(e) => setInvoice(e.target.value)} className="relative block w-full appearance-none rounded-lg border border-border bg-[#7F8487] px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75 " />
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-start gap-x-6">
                        <button disabled={isLoading} onClick={submitbtn} className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75 disabled:cursor-not-allowed disabled:opacity-75 space-x-2 !pl-3 !pr-4"><Search size={18} className="mr-2" /> {isLoading ? ' Loading...' : ' Cari Transaksi'}</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default invoicePage