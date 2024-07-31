import Link from "next/link";
import { motion } from "framer-motion";

const CardProduct = ({ ProductData, currentLang }: { ProductData: Product[], currentLang: string }) => {
    return (
        <div className="mb-4 grid grid-cols-3 gap-4 sm:mb-8 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-5 xl:grid-cols-6">
            {ProductData.map((data, index) => (
                <motion.div
                    key={data.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    style={{ opacity: 1, transform: 'none' }}
                >
                    <Link href={`${currentLang}/${data.product_slug}`} style={{ outline: "none", opacity: 1, transform: "none" }}>
                        <div className="group hover:scale-105 relative transform overflow-hidden rounded-2xl bg-muted duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background">
                            <img className="aspect-[4/6] object-cover object-center" src={data.product_img} alt={data.product_name} width={192} height={288} />
                            <article className="absolute inset-x-0 -bottom-10 z-10 flex transform flex-col px-3 transition-all duration-300 ease-in-out group-hover:bottom-3 sm:px-4 group-hover:sm:bottom-4">
                                <h2 className="truncate text-sm font-semibold text-foreground sm:text-xxs">
                                    {data.product_name}
                                </h2>
                                <p className="truncate text-xs text-foreground sm:text-xs">
                                    {data.product_provider}
                                </p>
                            </article>
                            <div className="absolute inset-0 transform bg-gradient-to-t from-transparent transition-all duration-300 group-hover:bg-gradient-to-top"></div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
};

export default CardProduct;
