import { Calculator } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";


const CalcSwitch = () => {
    const { lang, slug } = useParams() as { lang: string[], slug: string[] }; 
    const CurrentLang = lang ? lang.toString() : '';
    const asPath = usePathname();
    const [currentPage, setCurrentPage] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const currentPage = asPath ? asPath.split('/')[2] : null;

    const handleDropdownChange = (open: boolean | ((prevState: boolean) => boolean)) => {
        setIsDropdownOpen(open);
        if (open) {
            setCurrentPage("calculator"); 
        } else {
            setCurrentPage("");
        }
    };


    return(
        <DropdownMenu onOpenChange={handleDropdownChange}>
            <DropdownMenuTrigger asChild>
                <button 
                    className={`relative z-10 -mb-px flex items-center space-x-2 border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out ${
                        currentPage === 'calculator' ? 'border-primary text-primary' : 'text-foreground text-white hover:text-primary-300 border-transparent hover:border-primary'
                    }`}
                >
                    <Calculator width={20} height={20} />
                    <span>Kalkulator</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black" align="end">
                <DropdownMenuItem className="hover:bg-gray-200">
                    <span>
                        <a href={"/id/"} className="inline-flex px-2 text-sm">
                            {/* <IndonesiaFlag width={20} height={20}/> */}
                            {/* <Image src={IndonesiaFlag.src} width={20} height={20} alt="Indonesia Flag"/> */}
                        </a>
                    </span>
                    <span className="ml-1">
                        <a href={"/id/"}>
                            Indonesia
                        </a>
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-200">
                    <span>
                        <a href={"/en/"} className="inline-flex px-2 py-1 text-sm">
                            {/* <EnglishFlag width={20} height={20}/> */}
                            {/* <Image src={EnglishFlag.src} width={20} height={20} alt="English Flag"/> */}
                        </a>
                    </span>
                    <span className="ml-1">
                        <a href={"/en/"}>
                            English
                        </a>
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CalcSwitch