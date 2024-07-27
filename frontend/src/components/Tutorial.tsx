'use client'
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
interface Instruction {
    title: string;
    steps: string[];
}

export default function Tutorial({qrisInstruction, data}: {qrisInstruction: Instruction, data: any}) {
    const [isOpen, setIsOpen] = useState(false)
    const toggleCollapse = () => {
        setIsOpen(!isOpen)
    }
    return(
        <>
        {qrisInstruction && data.status_pembayaran === 'UNPAID' && (
            <button onClick={toggleCollapse} className="flex w-full justify-between rounded-lg bg-muted/50 px-4 py-3 text-left text-sm font-medium text-secondary-foreground focus:outline-none print:text-black">
                <span>Cara Melakukan Pembayaran</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
        )}
            {isOpen && (
                <div>
                {qrisInstruction && data.status_pembayaran === 'UNPAID' && (
                <div className="mt-1 rounded-lg border border-border/75 bg-muted/50 px-4 pb-1 pt-1 text-sm">
                    <p className="mt-3">
                        {qrisInstruction.steps.map((step: string, stepIndex: number) => (
                            <span key={stepIndex}>
                                {stepIndex + 1}. {step}
                                <br />
                            </span>
                        ))}
                        <br />
                    </p>
                </div>
                )}
            </div>
            )}
        </>
    )
}