import Link from "next/link"
import Image from "next/image"
import Logo from "../../public/assets/img/logo-1.png"
const Footer = (home: Home) => {
    return(
        <><div>
        <svg
          width={'100%'}
          height={'100%'}
          className="bg-transparent pt-8 transition delay-150 duration-300 ease-in-out md:pt-8 print:hidden"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#272d36"
            fillOpacity="1"
            d="M 0,400 C 0,400 0,200 0,200 C 40.34909359970402,243.0042668639783 80.69818719940804,286.0085337279566 135,268 C 189.30181280059196,249.9914662720434 257.5563448020718,170.97013195215192 311,159 C 364.4436551979282,147.02986804784808 403.07643359230485,202.11093846343573 452,207 C 500.92356640769515,211.88906153656427 560.137920828709,166.58611419410528 626,169 C 691.862079171291,171.41388580589472 764.3718830928599,221.54460476014305 826,248 C 887.6281169071401,274.45539523985695 938.3745467998519,277.2354667653225 985,246 C 1031.625453200148,214.7645332346775 1074.1299297077323,149.51352817856701 1122,137 C 1169.8700702922677,124.48647182143299 1223.1057343692194,164.71042052040943 1277,184 C 1330.8942656307806,203.28957947959057 1385.4471328153904,201.64478973979527 1440,200 C 1440,200 1440,400 1440,400 Z"
          ></path>
        </svg>
      </div><footer className="bg-[#272d36] pt-10 bottom-0">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="md:flex mt-6">
                        <div className="mb-6 md:mb-0 lg:w-[35%]">
                            <Link href="/" className="flex items-center mb-3">
                                <Image src={Logo.src} alt="Logo" width={100} height={100} />
                                {/* <span className="self-center text-2xl font-semibold whitespace-nowrap">Yustore</span> */}
                            </Link>
                            <span className="text-gray-500">{home.description}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 md:ml-20 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-6 text-md text-white">Peta Situs</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-sm">
                                    <li className="mb-4">
                                        <Link href="/" className="hover:underline">Beranda</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="/invoice" className="hover:underline">Cek Transaksi</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="/auth/login" className="hover:underline">Masuk</Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="/auth/register" className="hover:underline">Daftar</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-md text-white">Dukungan</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-sm">
                                    <li className="mb-4">
                                        <Link href="https://github.com/themesberg/flowbite" className="hover:underline ">Whatsapp</Link>
                                    </li>
                                    <li>
                                        <Link href="https://discord.gg/4eeurUVvTy" className="hover:underline">Instagram</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-md text-white">Legalitas</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-sm">
                                    <li className="mb-4">
                                        <Link href="#" className="hover:underline">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:underline">Terms &amp; Conditions</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="sm:flex sm:items-center pt-20 pb-3 sm:justify-between">
                        <span className="text-sm text-white-500 sm:text-center dark:text-white-400">© 2024 {home.title}<Link href="/" className="hover:underline"></Link>. All Rights Reserved.
                        </span>
                    </div>
                </div>
            </footer></>
    )
}

export default Footer