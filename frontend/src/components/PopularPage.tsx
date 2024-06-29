import Link from "next/link"

const PopularPage = ({PopularData}:{PopularData: Product[]}) => {
    
    return ( 
        <div className="mb-5">
              <h3 className="text-lg font-semibold uppercase leading-relaxed tracking-wider">
                🔥 POPULER SEKARANG!
              </h3>
              <p className="pl-6 text-xs"> 
                Berikut adalah beberapa produk yang paling populer saat ini.
              </p>
              <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-5">
                {PopularData.map((item) => (
                  <Link href={`/${item.product_slug}`} key={item.id}>
                    <li className="mt-2 p-2 bg-muted/30 rounded-xl flex items-center hover:scale-105 transition-transform duration-300">
                      <img className="rounded-xl w-full max-w-[55px] lg:max-w-[80px]" src={item.product_img} alt={item.product_name} />
                      <div className="ml-3 text-white">
                        <h6 className="text-xs font-bold">{item.product_name}</h6>
                        <p className="text-xs">{item.product_provider}</p>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
     )
}

export default PopularPage