import Link from "next/link";

const CardProduct = () => {
    return (
        <div className="mb-4 grid grid-cols-3 gap-4 sm:mb-8 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-5 xl:grid-cols-6" style={{opacity: 1, transform: 'none'}}>
            <Link href="/product" style={{outline: "none", opacity: 1, transform: "none"}}>
            <div className="group hover:scale-105 relative transform overflow-hidden rounded-2xl bg-muted duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:border-primary hover:ring-offset-2 hover:ring-offset-background">
            <img className="aspect-[4/6] object-cover object-center" src="https://play-lh.googleusercontent.com/B2aIz3JtIQ57hLCFo-mw9iymuFEe7A2wUvJYAjr1cuV28T2bzkWmAH0EU4JCw3T8hg" alt="" width={192} height={288} />
                <article className="absolute inset-x-0 -bottom-10 z-10 flex transform flex-col px-3 transition-all duration-300 ease-in-out group-hover:bottom-3 sm:px-4 group-hover:sm:bottom-4">
                    <h2 className="truncate text-sm font-semibold text-foreground sm:text-xxs">
                        Mobile Legends
                    </h2>
                    <p className="truncate text-xs text-foreground sm:text-xs">
                        Moonton
                    </p>
                </article>
                <div className="absolute inset-0 transform bg-gradient-to-t from-transparent transition-all duration-300 group-hover:bg-gradient-to-top"></div>
            </div>
            </Link>
            <Link href="/product" style={{outline: "none", opacity: 1, transform: "none"}}>
            <div className="group hover:scale-105 relative transform overflow-hidden rounded-2xl bg-muted duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background">
            <img className="aspect-[4/6] object-cover object-center" src="https://play-lh.googleusercontent.com/B2aIz3JtIQ57hLCFo-mw9iymuFEe7A2wUvJYAjr1cuV28T2bzkWmAH0EU4JCw3T8hg" alt="" width={192} height={288} />
                <article className="absolute inset-x-0 -bottom-10 z-10 flex transform flex-col px-3 transition-all duration-300 ease-in-out group-hover:bottom-3 sm:px-4 group-hover:sm:bottom-4">
                    <h2 className="truncate text-sm font-semibold text-foreground sm:text-xxs">
                        Mobile Legends
                    </h2>
                    <p className="truncate text-xs text-foreground sm:text-xs">
                        Moonton
                    </p>
                </article>
                <div className="absolute inset-0 transform bg-gradient-to-t from-transparent transition-all duration-300 group-hover:bg-gradient-to-top"></div>
            </div>
            </Link>

        </div>
    );
};

export default CardProduct