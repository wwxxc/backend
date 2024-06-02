import InfinitySlider from "@/components/InfinitySlider";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const images = [
    'https://via.placeholder.com/800x400?text=Slide+1',
    'https://via.placeholder.com/800x400?text=Slide+2',
    'https://via.placeholder.com/800x400?text=Slide+3',
  ];
  return (
    <div>
      <nav className="sticky top-0 z-40 w-full flex-none border-b border-[#000000]/50 bg-black/80 backdrop-blur print:hidden">
        <div className="container">
          <div className="flex h-[60px] items-center">
            <button className="rounded-md bg-secondary p-2 text-foreground lg:hidden">

            </button>
            <div className="ml-3 mr-2 flex lg:ml-0">
              <img src="/logo.png" alt="logo" />
            </div>
            <div className="hidden lg:ml-10 lg:block lg:self-stretch">
              <div className="flex h-full space-x-6">
                <Link className="relative z-10 -mb-px flex items-center space-x-2 border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out border-primary text-primary" href={"/"}>
                  {/* svgicon */}
                  <span>Home</span>
                </Link>
                <Link className="relative z-10 -mb-px flex items-center space-x-2 border-b-2 pt-px text-sm font-medium text-foreground transition-colors duration-200 ease-out hover:text-primary-300 border-transparent hover:border-primary" href={"/invoice"}>
                  {/* svgicon */}
                  <span>Cek transaksi</span>
                </Link>
                <Link className="relative z-10 -mb-px flex items-center space-x-2 border-b-2 pt-px text-sm font-medium text-foreground transition-colors duration-200 ease-out hover:text-primary-300 border-transparent hover:border-primary" href={"/invoice"}>
                  {/* svgicon */}
                  <span>Kalkulator</span>
                </Link>
              </div>
            </div>
            <div className="ml-auto flex h-full items-center space-x-2 lg:space-x-6">
              <div className="flex flex-row-reverse items-center gap-x-2">
                <div className="relative inline-block text-left">
                  <div>
                    <button className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-border/50 bg-transparent py-2 pl-4 pr-3 text-sm font-semibold uppercase text-foreground duration-300 ease-in-out hover:bg-muted/50">
                      id
                    </button>
                  </div>
                </div>
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border/50 bg-transparent px-2 py-2 text-sm font-semibold text-foreground duration-300 ease-in-out hover:bg-muted/50 sm:pl-3 sm:pr-4">
                  search
                </button>
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-2">
                <Link href={"/login"} className="inline-flex items-center justify-center rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-foreground duration-300 ease-in-out hover:bg-muted/75">
                  Masuk
                </Link>
                <Link href={"/register"} className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75"> 
                  Daftar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="relative bg-black">
        <section className="relative flex items-center overflow-hidden bg-/50 px-4 py-4 lg:min-h-[521.96px]">
          <div className="swiper swiper-initialized swiper-horizontal container swiper-backface-hidden">
          <InfinitySlider images={images}/>
          </div>
        </section>
      </main>
    </div>
  );
}
