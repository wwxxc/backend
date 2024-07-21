"use client";

const PaymentButton = ({ payUrl }:{payUrl:string}) => {
  return (
    <button
      onClick={() => window.open(payUrl)}
      className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75 disabled:cursor-not-allowed disabled:opacity-75"
    >
      Klik disini untuk melakukan pembayaran
    </button>
  );
};

export default PaymentButton;
