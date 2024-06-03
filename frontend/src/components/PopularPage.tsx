import Link from "next/link"

const PopularPage = () => {

    return ( 
        <div className="mb-5">
              <h3 className="text-lg font-semibold uppercase leading-relaxed tracking-wider">
                🔥 POPULER SEKARANG!
              </h3>
              <p className="pl-6 text-xs"> 
                Berikut adalah beberapa produk yang paling populer saat ini.
              </p>
              <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-5">
                <Link href="/product/1">
                <li className="mt-2 p-2 bg-muted/30 rounded-xl flex items-center hover:scale-105 transition-transform duration-300">
                  <img className="rounded-xl w-full max-w-[60px] lg:max-w-[85px]" src="https://play-lh.googleusercontent.com/B2aIz3JtIQ57hLCFo-mw9iymuFEe7A2wUvJYAjr1cuV28T2bzkWmAH0EU4JCw3T8hg" alt="Mobile legends" />
                  <div className="ml-3 text-white">
                    <h6 className="text-xs font-bold">Mobile legends</h6>
                    <p className="text-xs">Moonton</p>
                  </div>
                </li>
                </Link>
                <li className="mt-2 p-2 bg-muted/30 rounded-xl flex items-center hover:scale-105 transition-transform duration-300">
                  <img className="rounded-xl w-full max-w-[60px] lg:max-w-[85px]" src="https://play-lh.googleusercontent.com/B2aIz3JtIQ57hLCFo-mw9iymuFEe7A2wUvJYAjr1cuV28T2bzkWmAH0EU4JCw3T8hg" alt="Mobile legends" />
                  <div className="ml-3 text-white">
                    <h6 className="text-xs font-bold">Mobile legends</h6>
                    <p className="text-xs">Moonton</p>
                  </div>
                </li>
                <li className="mt-2 p-2 bg-muted/30 rounded-xl flex items-center hover:scale-105 transition-transform duration-300">
                  <img className="rounded-xl w-full max-w-[60px] lg:max-w-[85px]" src="https://play-lh.googleusercontent.com/B2aIz3JtIQ57hLCFo-mw9iymuFEe7A2wUvJYAjr1cuV28T2bzkWmAH0EU4JCw3T8hg" alt="Mobile legends" />
                  <div className="ml-3 text-white">
                    <h6 className="text-xs font-bold">Mobile legends</h6>
                    <p className="text-xs">Moonton</p>
                  </div>
                </li>
              </ul>
            </div>
     )
}

export default PopularPage