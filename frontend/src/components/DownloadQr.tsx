// InteractiveInvoice.tsx
"use client";

import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import saveAs from 'file-saver';

interface InteractiveInvoiceProps {
    invoiceId: string;
    qrUrl: string | null;
}
const DownloadIQr: React.FC<InteractiveInvoiceProps> = ({ invoiceId, qrUrl }) => {
    const downloadQRCode = () => {
        if (qrUrl) {
            const link = document.createElement('a');
            link.href = qrUrl;
            link.download = `qr_code_${invoiceId}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); 
        }
    };

    return (
        <div>
            {qrUrl && (
                <button onClick={downloadQRCode} className="inline-flex items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75 disabled:cursor-not-allowed disabled:opacity-75 mt-2 w-64 py-2 !text-xs sm:w-56 print:hidden">
                    Download Code QR
                </button>
            )}
        </div>
    );
};

export default DownloadIQr;
