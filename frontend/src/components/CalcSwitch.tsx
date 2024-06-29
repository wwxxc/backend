import { Calculator } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";


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
                <DropdownMenuItem className="">
                    <Link href={"/id/"} className="w-full p-2 rounded-md inline-flex px-2 text-sm">
                        <Calculator width={20} height={20} />
                        <span className="ml-3">
                            <h1 className="text-md ">
                                Win Rate
                            </h1>
                        </span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="">
                    <Link href={"/id/"} className="w-full p-2 rounded-md inline-flex px-2 text-sm">
                        <Calculator width={20} height={20} />
                        <span className="ml-3">
                            <h1 className="text-md ">
                                Magic Wheel
                            </h1>
                        </span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="">
                    <Link href={"/id/"} className="w-full p-2 rounded-md inline-flex px-2 text-sm">
                        <Calculator width={20} height={20} />
                        <span className="ml-3">
                            <h1 className="text-md ">
                                Zodiac
                            </h1>
                        </span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CalcSwitch