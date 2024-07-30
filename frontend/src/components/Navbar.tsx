'use client'
import { HomeIcon, Search, Calculator, ChevronDown, XIcon } from "lucide-react";
import Link from "next/link";
import SearchToggle from "./Search";
import Image from "next/image";
import LangSwitch from "./LangSwitch";
import Logo from "../../public/assets/img/logo-2.png"
import { useParams, usePathname } from "next/navigation";
import CalcSwitch from "./CalcSwitch";
import { getDictionary } from "../app/[lang]/dictionaries";
import Drawer from 'react-modern-drawer'
import { useEffect, useState } from "react";
import 'react-modern-drawer/dist/index.css'

const Navbar = () => {
    const { lang, slug } = useParams() as { lang: string[], slug: string[] }; 
    const [dictionary, setDictionary] = useState<any>({});
    const CurrentLang = lang ? lang.toString() : '';
    const asPath = usePathname();
    const currentPage = asPath ? asPath : null;
    const asPath2 = usePathname().split('/');
    const CurrentUrl = asPath2[2] + '/' + asPath2[3];

    useEffect(() => {
      const loadDictionary = async () => {
        const dict = await getDictionary(lang);
        setDictionary(dict);
      };
      loadDictionary();
    }, [lang]);
    
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    
    return(
        <>
        <nav className="sticky top-0 z-40 w-full flex-none border-b border-[#000000]/50 bg-background-foreground/80 backdrop-blur print:hidden">
        <div className="container">
          <div className="flex h-[60px] items-center">
            <button onClick={toggleDrawer} className="rounded-md bg-black p-2 text-foreground lg:hidden">
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <div className="ml-3 mr-2 flex lg:ml-0">
              <Link href={`/${lang}`}	>
                <Image src={Logo.src} alt="Logo" width={90} height={90} />
              </Link>
            </div>
            <div className="hidden lg:ml-[250px] lg:block lg:self-stretch">
              <div className="flex h-full space-x-6">
              <Link
                className={`relative z-10 -mb-px flex items-center space-x-2 border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out ${
                  currentPage === `/${lang}` ? 'border-primary text-primary' : 'text-foreground text-white hover:text-primary-300 border-transparent hover:border-primary'
                }`}
                href={`/${lang}`}	
              >
                <HomeIcon width={20} height={20} />
                <span>{dictionary.home}</span>
              </Link>
              <Link
                className={`relative z-10 -mb-px flex items-center space-x-2 border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out ${
                  currentPage === `/${lang}/invoice` ? 'border-primary text-primary' : 'text-foreground text-white hover:text-primary-300 border-transparent hover:border-primary'
                }`}
                href={`/${lang}/invoice`}
              >
                <Search width={20} height={20} />
                <span>{dictionary.invoice}</span>
              </Link>
              <CalcSwitch dict={dictionary}  />
              </div>
            </div>
            <div className="ml-auto flex h-full items-center space-x-2 lg:space-x-6">
              <div className="flex flex-row-reverse items-center gap-x-2">
                <div className="relative inline-block text-left">
                  <div>
                    <LangSwitch lang={CurrentLang} currentUrl={CurrentUrl} />
                  </div>
                </div>
                <SearchToggle />
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-2">
                <Link href={"/sign-in"} className="inline-flex items-center justify-center rounded-lg border border-border/100 px-4 py-2 text-sm font-medium text-foreground duration-300 ease-in-out hover:bg-muted/75">
                    Masuk
                </Link>
                <Link href={"/sign-up"} className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75"> 
                  Daftar
                </Link>
              </div>
            </div>
            
          </div>
          <div className="lg:hidden">
          <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                className='w-full'
                lockBackgroundScroll={true}
                size={300}
            >
                <div className="bg-muted h-full w-full overflow-hidden">
                  <div className="flex flex-row-reverse items-center justify-between border-b border-background p-4">
                    <button className="text-murky-400 -m-2 inline-flex items-center justify-center rounded-md p-2"><span className="sr-only">Close menu</span><XIcon onClick={toggleDrawer} className="h-6 w-6" /></button>
                    <div className="flex items-center">
                      <a className="relative w-24" href={`/${lang}`}>
                        <img src="http://192.168.1.15:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-1.836fce09.png&w=96&q=75" alt="" className="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;" />
                      </a>
                    </div>
                  </div>
                  <div className="space-y-2 border-background p-4">
                    <div>
                      <a className="group flex items-center justify-between rounded-md px-4 py-2 font-medium text-foreground hover:bg-muted/20" href={`/${lang}`}>
                        <span>{dictionary.home}</span>
                      </a>
                    </div>
                    <div>
                      <a className="group flex items-center justify-between rounded-md px-4 py-2 font-medium text-foreground hover:bg-muted/20" href={`/${lang}/invoice`}>
                        <span>{dictionary.invoice}</span>
                      </a>
                    </div>
                    <div>
                      <a className="group flex items-center justify-between rounded-md px-4 py-2 font-medium text-foreground hover:bg-muted/20" href={`/${lang}/invoice`}>
                        <span>Kalkulator</span>
                      </a>
                    </div>
                  </div>
                </div>
            </Drawer>
          </div>
        </div>
      </nav>
      </>
    )
}

export default Navbar