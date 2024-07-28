'use client'
import { useState } from "react";
import addThousandSeparators from "@/utils/formatPrice";
import { ChevronsUpDown } from "lucide-react";


export default function Rincian({dataTripay, dict}:{dataTripay:any, dict:any}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    }
    
    return (
        <><button onClick={toggleCollapse} className="mt-1 flex w-full items-center justify-between rounded-md bg-muted/55 py-2 pl-4 pr-2 text-sm">
            <span>
                Lihat Rincian Pembayaran
            </span>
            <ChevronsUpDown size={18} />
        </button>
        {isOpen && (
            <div>
                <dd className="mt-1 rounded-md bg-muted/55 p-4 text-sm leading-6 text-secondary-foreground sm:col-span-2 sm:mt-0 print:text-black">
                    <dl className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <dt className="font-medium text-secondary-foreground print:text-black">{dict.rincione}</dt>
                            <dd className="text-secondary-foreground print:text-black">Rp  {addThousandSeparators(dataTripay.data.amount_received)}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="font-medium text-secondary-foreground print:text-black">{dict.rincitwo}</dt>
                            <dd className="text-secondary-foreground print:text-black">1 qty</dd>
                        </div>
                        <div className="bg-secondary-700/50 h-px w-full print:hidden"></div>
                        <div className="flex justify-between">
                            <dt className="font-medium text-secondary-foreground print:text-black">{dict.rincithree}</dt>
                            <dd className="text-secondary-foreground print:text-black">Rp  {addThousandSeparators(dataTripay.data.amount)}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="font-medium text-secondary-foreground print:text-black">{dict.rincifour}</dt>
                            <dd className="text-secondary-foreground print:text-black">{dataTripay.data.fee_customer}</dd>
                        </div>
                    </dl>
                </dd>
            </div>
            )}
        </>
    )
}