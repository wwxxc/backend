'use client'
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; 

const Description = ({ product, home }: { product: Product, home: Home }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="flex w-full items-center justify-between rounded-lg bg-muted/75 px-4 py-2 text-left text-xs font-medium text-card-foreground focus:outline-none"
        onClick={toggleCollapse}
      >
        <span>Deskripsi dan cara melakukan transaksi</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && (
        <div className='mt-2'>
          <div className='rounded-xl bg-muted/50 px-4 pb-4 pt-2 shadow-2xl'>
            <div className='prose prose-sm text-xs text-foreground'>
              <div>
                <p dir='ltr'>{home.title} mempersembahkan penawaran istimewa untuk para gamers sejati! Kami hadir dengan layanan Top Up resmi dan 100% legal untuk 
                  <strong> {product.product_name}</strong>
                  , yang dirancang khusus untuk meningkatkan pengalaman bermain game Anda. Nikmati kemudahan, keamanan, dan harga yang terjangkau dalam setiap transaksi Top Up Anda. 
                </p>
                <p dir='ltr' className='mt-2'>
                  Top Up 
                  <strong> {product.product_name} </strong>
                   Resmi, Murah, Aman, & Terpercaya
                </p>
                <p dir='ltr' className='mt-2'>
                  Berikut adalah langkah-langkah sederhana untuk Top Up 
                  <strong> {product.product_name} </strong>
                  :
                </p>
                <p dir='ltr' className='mt-2'>
                  1. Masukkan Data Akun 
                  <strong> {product.product_name} </strong>
                  (Pastikan data yang Anda masukkan sudah benar dan lengkap)
                  <br />
                  2. Pilih Nominal Diamond (Kami menyediakan berbagai pilihan nominal yang bisa Anda sesuaikan dengan kebutuhan)
                  <br />
                  3. Pilih Metode Pembayaran (Kenyamanan Anda adalah prioritas kami. Kami menyediakan berbagai metode pembayaran yang mudah dan aman)
                  <br />
                  4. Masukkan Kode Promo Jika Ada (Gunakan kode promo untuk mendapatkan penawaran spesial dan diskon menarik)
                  <br />
                  5. Masukkan Nomor Whatsapp dan Email yang Valid (Dapatkan konfirmasi dan notifikasi langsung ke kontak Anda)
                  <br />
                  6. Klik Order Now & Lakukan Pembayaran (Proses mudah dan cepat, kini Anda tinggal selangkah lagi untuk meningkatkan pengalaman gaming Anda)
                  <br />
                  7. Diamond Akan Masuk Otomatis ke Akun Anda (Tunggu dan rasakan sensasi permainan yang lebih seru dengan cepat dan aman)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Description;
