import Countdown from "@/components/Countdown";
import PaymentButton from "@/components/PaymentButton";
import axios from "axios"

interface Instruction {
    title: string;
    steps: string[];
}

const Invoice = async ({ params }: { params: { lang: string, id: string}}) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const data = await axios.post(`${API_URL}/invoice/`+params.id)
    const data_tripay = JSON.parse(data.data.response_tripay);
    const qrisInstruction = data_tripay.data.instructions.find((instruction: Instruction) => instruction.title === "Pembayaran via QRIS");
    
    return (
        <main className="relative bg-[#393E46]">
            <div className="container pb-8 pt-12  md:pt-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-base font-semibold text-secondary-foreground print:text-black">
                        Terima Kasih!
                    </h1>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-secondary-foreground md:text-4xl print:text-black">
                        Harap lengkapi pembayaran.
                    </p>
                    <p className="mt-3.5 text-base text-secondary-foreground print:text-black">
                        Pesanan kamu
                        <button className="mx-1 rounded-md border border-border/75 bg-secondary/25 px-1 font-bold text-secondary-foreground print:text-black">
                        {params.id}
                        </button>
                        menunggu pembayaran sebelum dikirim.
                    </p>
                </div>
            </div>
            <div className="container flex w-full justify-end pb-4 print:hidden">
                <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75 disabled:cursor-not-allowed disabled:opacity-75">
                    Download Invoice
                </button>
            </div>
            <div className="container grid grid-cols-3 gap-4">
                <div className="col-span-3 rounded-xl border border-border/75 bg-secondary/25 p-4 md:col-span-2">
                    <div>
                        <div>
                            <h3 className="text-base font-semibold leading-7 text-secondary-foreground print:text-black">Detail Pembelian</h3>
                            <p className="text- mt-1 max-w-2xl text-sm leading-6">Pembelian produk {data.data.produk} {data.data.item} </p>
                        </div>
                    </div>
                    <div className="mt-4 border-t border-border/75">
                        <dl className="divide-secondary-700/25 divide-y">
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">Nomor Invoice</dt>
                                <dd className="mt-1 text-sm leading-6 text-secondary-foreground sm:col-span-2 sm:mt-0 print:text-black">{params.id}</dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">Status Transaksi</dt>
                                <dd className="mt-1 text-sm leading-6 text-secondary-foreground sm:col-span-2 sm:mt-0 print:text-black">{data.data.status_transaksi}</dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">Status Pembayaran</dt>
                                <dd className="mt-1 text-sm leading-6 text-secondary-foreground sm:col-span-2 sm:mt-0 print:text-black">{data.data.status_pembayaran}</dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">Pesan</dt>
                                <dd className="mt-1 text-sm leading-6 text-secondary-foreground sm:col-span-2 sm:mt-0 print:text-black">{data.data.pesan}</dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">Rincian Pembayaran</dt>
                                <div className="mt-1 flex items-center justify-between rounded-md bg-primary/25 p-4 text-sm leading-6 text-secondary-foreground sm:mt-0 print:py-0 print:text-black">
                                    <div>
                                        Total Pembayaran
                                    </div>
                                    <div>
                                        {data.data.harga}
                                    </div>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="col-span-3 flex flex-col gap-4 rounded-xl border border-border/75 bg-secondary/25 p-4 md:col-span-1">
                    <div className="w-full text-center text-sm font-medium">
                        <dt className="text-secondary-foreground print:text-black">
                            Pesanan ini akan kedaluwarsa pada
                        </dt>
                        <dd className="text-primary-500 mt-2">
                            <div className="rounded-md bg-red-500 px-4 py-2 text-center text-foreground print:p-0 print:text-left print:text-slate-800">
                                <Countdown targetTimestamp={data_tripay.data.expired_time} />
                            </div>
                        </dd>
                    </div>
                    <div className="rounded-md bg-secondary/50 p-4">
                        <h2 className="text-sm font-semibold leading-6">
                            Metode Pembayaran
                        </h2>
                        <h3 className="text-sm font-semibold leading-6">
                            {data.data.payment_name}
                        </h3>
                    </div>
                    <div className="prose prose-sm">
                        {qrisInstruction && (
                            <button className="flex w-full justify-between rounded-lg bg-secondary/50 px-4 py-3 text-left text-sm font-medium text-secondary-foreground focus:outline-none print:text-black">
                                <span>
                                Cara Melakukan Pembayaran
                                </span>
                            </button>
                        )}
                        <div className="mt-1 rounded-lg border border-border/75 bg-secondary/50 px-4 pb-1 pt-1 text-sm">
                            <div>
                            {qrisInstruction && (
                                <p className="selectable-text copyable-text x15bjb6t x1n2onr6">
                                    {qrisInstruction.steps.map((step: string, stepIndex: number) => (
                                        <span key={stepIndex} className="selectable-text copyable-text">
                                            {stepIndex + 1}. {step}
                                            <br /> 
                                        </span>
                                    ))}
                                <br />
                                </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                        {data_tripay.data.qr_url && (
                            <><div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-lg bg-white sm:h-56 sm:w-56">
                                <div>
                                    <img src={data_tripay.data.qr_url} alt="" />
                                </div>
                            </div><div className="inline-flex items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75 disabled:cursor-not-allowed disabled:opacity-75 mt-2 w-64 py-2 !text-xs sm:w-56 print:hidden">
                                    Unduh Kode QR
                                </div></>
                        )}

                        {data_tripay.data.pay_code && (
                            <div className="flex flex-col items-center justify-between">
                                <div className="flex w-full items-center justify-between">
                                    <div className="col-span-3 inline-flex items-center md:col-span-4">Nomor Pembayaran</div>
                                    <button>{data_tripay.data.pay_code}</button>
                                </div>
                            </div>
                        )}

                        {data_tripay.data.pay_url && (
                            <PaymentButton payUrl={data_tripay.data.pay_url} />
                        )}
                    </div>
                        </div>
                    </div>
                    
                </div>
                <div className="col-span-3 rounded-xl border border-border/75 bg-secondary/25 p-4 md:col-span-3">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="grid w-full grid-cols-1 gap-4 rounded-md bg-secondary/25 p-4 md:grid-cols-2">
                            <div>
                                <h3 className="text-sm font-semibold leading-6">Informasi Akun</h3>
                                <div className="divide-secondary-700/50 mt-4 divide-y border-t border-border/75 text-sm font-medium text-secondary-foreground print:text-black">
                                    <div className="grid grid-cols-3 gap-x-4 py-2">
                                        <dt className="col-span-3 text-sm font-medium leading-6 text-secondary-foreground md:col-span-1 print:text-black">
                                            Nickname
                                        </dt>
                                        <dd className="col-span-3 text-xs leading-6 text-secondary-foreground sm:col-span-2 md:text-sm print:text-black">
                                            {data.data.username}
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-3 gap-x-4 py-2">
                                        <dt className="col-span-3 text-sm font-medium leading-6 text-secondary-foreground md:col-span-1 print:text-black">
                                            ID
                                        </dt>
                                        <dd className="col-span-3 text-xs leading-6 text-secondary-foreground sm:col-span-2 md:text-sm print:text-black">
                                            {data.data.userid}
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-3 gap-x-4 py-2">
                                        <dt className="col-span-3 text-sm font-medium leading-6 text-secondary-foreground md:col-span-1 print:text-black">
                                            Server
                                        </dt>
                                        <dd className="col-span-3 text-xs leading-6 text-secondary-foreground sm:col-span-2 md:text-sm print:text-black">
                                            {data.data.userserver}
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Invoice