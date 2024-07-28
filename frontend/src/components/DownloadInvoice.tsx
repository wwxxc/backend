// InteractiveInvoice.tsx
"use client";

import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InteractiveInvoiceProps {
    invoiceId: string;
}

const DownloadInvoice: React.FC<InteractiveInvoiceProps> = ({ invoiceId }) => {
    const printInvoice = () => {
        window.print();
    };

    return (
        <div className="container flex w-full justify-end pb-4 print:hidden">
            <button onClick={printInvoice} className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75 disabled:cursor-not-allowed disabled:opacity-75">
                Download Invoice
            </button>
        </div>
    );
};

export default DownloadInvoice;
