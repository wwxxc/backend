import Countdown from "@/components/Countdown";
import PaymentButton from "@/components/PaymentButton";
import formatDateTime from "@/utils/formatDatetime";
import addThousandSeparators from "@/utils/formatPrice";
import axios from "axios";
import React from "react";
import Rincian from "@/components/Rincian";
import Tutorial from "@/components/Tutorial";
import { getDictionary } from "../../dictionaries";
import DownloadInvoice from "@/components/DownloadInvoice";
import DownloadIQr from "@/components/DownloadQr";
import Custom404 from  "@/app/not-found";
import Rating from "@/components/Rating";
import { Metadata, ResolvingMetadata } from "next";

interface Instruction {
    title: string;
    steps: string[];
}


const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
    params: { id: string, [key: string]: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
 
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {

    const home: Home = await fetch(API_URL + '/home').then((res) => res.json())
    const previousImages = (await parent).openGraph?.images || []
    return {
      title: 'Invoice ' + params.id + ' - ' + home.title + ' - ' + home.description,
      description: home.description,
      keywords: home.title,
      icons: {
        icon: home.url_favicon,
      },
      openGraph: {
        images: ['/.jpg', ...previousImages],
      },
    }
  }

const Invoice = async ({ params }: { params: { lang: string, id: string } }) => {
    const { id } = params;

    try {
        // Mengambil data invoice dari API
        const response = await axios.post(`${API_URL}/invoice/${id}`);
        const data = response.data;
        const data_tripay = JSON.parse(data.response_tripay);
        const dict = await getDictionary(params.lang);

        const response_review = await axios.get(`${API_URL}/review/invoice/${id}`);
        const review = response_review.data
        
        // Mencari instruksi QRIS
        const qrisInstruction = data_tripay.data.instructions.find((instruction: Instruction) => instruction.title === "Pembayaran via QRIS" || instruction.title === "Pembayaran via ALFAMART" || instruction.title === "Pembayaran via INDOMARET" || instruction.title === "Pembayaran via ALFAMIDI");

        // Mendapatkan kelas status berdasarkan status transaksi
        const getStatusClass = (status: string) => {
            switch (status) {
                case 'Success':
                    return 'bg-green-300 text-green-800';
                case 'Processing':
                    return 'bg-blue-300 text-blue-800';
                case 'Error':
                case 'Failed':
                case 'Cancelled':
                    return 'bg-red-300 text-red-800';
                case 'Pending':
                default:
                    return 'bg-yellow-300 text-yellow-800';
            }
        };

        return (
            <main className="relative bg-[#393E46] mb-20">
                <div className="container pb-8 pt-12 md:pt-24">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-base font-semibold text-secondary-foreground print:text-black">
                            {dict.thank}
                        </h1>
                        <p className="mt-2 text-2xl font-bold tracking-tight text-secondary-foreground md:text-4xl print:text-black">
                            {data.status_pembayaran === 'UNPAID' ? `${dict.thanktitle}` : `${dict.thanktitle2}`}
                        </p>
                        <p className="mt-3.5 text-base text-secondary-foreground print:text-black">
                                {dict.thankdesc}
                            <button className="mx-1 rounded-md border border-border/75 bg-muted/65 px-1 font-bold text-secondary-foreground print:text-black">
                                {id}
                            </button>
                            {data.status_pembayaran === 'UNPAID' ? `${dict.thankdescnext}` : `${dict.thankdescnext2}`}
                        </p>
                    </div>
                </div>
                <DownloadInvoice invoiceId={id} />
                <div className="container grid grid-cols-3 gap-4">
                    <div className="col-span-3 rounded-xl border border-border/75 bg-muted/55 p-4 md:col-span-2">
                        <div>
                            <h3 className="text-base font-semibold leading-7 text-secondary-foreground print:text-black">
                                Detail Pembelian
                            </h3>
                            <p className="text-sm mt-1 max-w-2xl leading-6">
                                Pembelian produk {data.produk} {data.item}
                            </p>
                        </div>
                        <div className="mt-4 border-t border-border/75">
                            <dl className="divide-secondary-700/25 divide-y">
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">
                                        {dict.invoone}
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-secondary-foreground sm:col-span-2 sm:mt-0 print:text-black">
                                        {id}
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">
                                        {dict.invotwo}
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-secondary-foreground sm:col-span-2 sm:mt-0 print:text-black">
                                        <span className={`inline-flex rounded-sm px-2 text-xs font-semibold leading-5 print:p-0 ${getStatusClass(data.status_transaksi)}`}>
                                            {data.status_transaksi}
                                        </span>
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">
                                        {dict.invothree}
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-secondary-foreground sm:col-span-2 sm:mt-0 print:text-black">
                                        <span className={`inline-flex rounded-sm px-2 text-xs font-semibold leading-5 print:p-0 ${data.status_pembayaran === 'PAID' ? 'bg-green-300 text-green-800' : 'bg-rose-300 text-rose-800'}`}>
                                            {data.status_pembayaran}
                                        </span>
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">
                                        {dict.invofour}
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-secondary-foreground sm:col-span-2 sm:mt-0 print:text-black">
                                        {data.pesan}
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                    <dt className="text-sm font-medium leading-6 text-secondary-foreground print:text-black">
                                        {dict.invofive}
                                    </dt>
                                    <div className="space-y-4 sm:col-span-2">
                                        <Rincian dataTripay={data_tripay} dict={dict} />
                                    <div className="mt-1 flex w-full items-center justify-between rounded-md bg-muted/55 p-4 text-sm leading-6 text-secondary-foreground sm:mt-0 print:py-0 print:text-black">
                                        <div>{dict.invosix}</div>
                                        <div>Rp {addThousandSeparators(data_tripay.data.amount)}</div>
                                    </div>
                                    </div>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="col-span-3 flex flex-col gap-4 rounded-xl border border-border/75 bg-muted/55 p-4 md:col-span-1">
                        <div className="w-full text-center text-sm font-medium">
                            <dt className="text-secondary-foreground print:text-black">
                                {data.status_pembayaran === 'UNPAID' ? `${dict.expired}` : `${dict.expired2}`}
                            </dt>
                            <dd className="text-primary-500 mt-2">
                                <div className={`rounded-md ${data.status_pembayaran === 'UNPAID' ? 'bg-red-500' : 'bg-green-500'} px-4 py-2 text-center text-foreground print:p-0 print:text-left print:text-slate-800`}>
                                    {data.status_pembayaran === 'UNPAID' ? <Countdown targetTimestamp={data_tripay.data.expired_time} /> : formatDateTime(data.createdAt)}
                                </div>
                            </dd>
                        </div>
                        <div className="rounded-md bg-muted/50 p-4">
                            <h2 className="text-sm font-semibold leading-6">
                                Metode Pembayaran
                            </h2>
                            <h3 className="text-sm font-semibold leading-6">
                                {data.payment_name}
                            </h3>
                        </div>
                        <div className="prose prose-sm">
                            <Tutorial qrisInstruction={qrisInstruction} data={data} />
                            <div className="flex flex-col mt-4">
                                    {data_tripay.data.qr_url && data.status_pembayaran === 'UNPAID' && (
                                        <>
                                            <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-lg bg-white sm:h-56 sm:w-56">
                                                <div>
                                                    <img src={data_tripay.data.qr_url} alt="QR Code" />
                                                </div>
                                            </div>
                                            <DownloadIQr invoiceId={data_tripay.data.merchant_ref} qrUrl={data_tripay.data.qr_url} />
                                        </>
                                    )}
                                    {data_tripay.data.pay_code && data.status_pembayaran === 'UNPAID' && (
                                        <div className="flex flex-col items-center justify-between">
                                            <div className="flex w-full items-center text-sm justify-between">
                                                <div className="col-span-3 inline-flex items-center md:col-span-4">Nomor Pembayaran</div>
                                                <button>{data_tripay.data.pay_code}</button>
                                            </div>
                                        </div>
                                    )}
                                    {data_tripay.data.pay_url && data.status_pembayaran === 'UNPAID' && (
                                        <PaymentButton payUrl={data_tripay.data.pay_url} />
                                    )}
                                </div>
                        </div>
                    </div>
                    <div className="col-span-3 rounded-xl border border-border/75 bg-muted/55 p-4 md:col-span-3">
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="grid w-full grid-cols-1 gap-4 rounded-md bg-muted/55 p-4 md:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-semibold leading-6">Informasi Akun</h3>
                                    <div className="divide-secondary-700/50 mt-4 divide-y border-t border-border/75 text-sm font-medium text-secondary-foreground print:text-black">
                                        <div className="grid grid-cols-3 gap-x-4 py-2">
                                            <dt className="col-span-3 text-sm font-medium leading-6 text-secondary-foreground md:col-span-1 print:text-black">
                                                Nickname
                                            </dt>
                                            <dd className="col-span-3 text-xs leading-6 text-secondary-foreground sm:col-span-2 md:text-sm print:text-black">
                                                {data.username}
                                            </dd>
                                        </div>
                                        <div className="grid grid-cols-3 gap-x-4 py-2">
                                            <dt className="col-span-3 text-sm font-medium leading-6 text-secondary-foreground md:col-span-1 print:text-black">
                                                ID
                                            </dt>
                                            <dd className="col-span-3 text-xs leading-6 text-secondary-foreground sm:col-span-2 md:text-sm print:text-black">
                                                {data.userid}
                                            </dd>
                                        </div>
                                        <div className="grid grid-cols-3 gap-x-4 py-2">
                                            <dt className="col-span-3 text-sm font-medium leading-6 text-secondary-foreground md:col-span-1 print:text-black">
                                                Server
                                            </dt>
                                            <dd className="col-span-3 text-xs leading-6 text-secondary-foreground sm:col-span-2 md:text-sm print:text-black">
                                                {data.userserver}
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                                {data.status_transaksi === 'Success' && (
                                    <div>
                                        <div>
                                            <a href="" className="print:text-black-foreground bg-primary hover:bg-primary/50 flex w-full items-center justify-center rounded-lg py-2 text-sm font-semibold leading-6 text-secondary-foreground duration-200 ease-in-out">Beli Lagi</a>
                                        </div>
                                        <div className="pt-8 print:hidden">
                                            <Rating data={data} review={review} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    } catch (error: any) {
        return (
            <Custom404 />
        );
    }
};



export default Invoice;
