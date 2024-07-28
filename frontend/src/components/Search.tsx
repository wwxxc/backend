"use client"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { History } from "lucide-react"
  
  import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import React from "react"
import Link from "next/link"
// import { SurahItem } from "@/types/surah-type"
import { useParams } from "next/navigation"

const SearchToggle = () => {
  const param = useParams();
  const CurrentLang = param.lang ? param.lang.toString() : '';
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<Product[]>([]);
  
    useEffect(() => {
    fetch('http://192.168.1.15:4000/search')
      .then(Response => Response.json())
      .then(data => setProduct(data))
      const down = (e: KeyboardEvent) => {
        if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      };

      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, [])

    return (
      <>
        <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border/100 bg-transparent px-2 py-2 text-sm font-semibold text-foreground duration-300 ease-in-out hover:bg-muted/50 sm:pl-3 sm:pr-4" onClick={() => setOpen(true)}>
            <Search width={20} height={20}  />
            <span className="hidden lg:block">
                Search
            </span>
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>Produk tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {product.map((item, index) => (
                <Link onClick={() => setOpen(false)} key={index} href={`/${CurrentLang}/${item.product_slug}`}>
                <CommandItem >
                  <img className="aspect-square w-20 rounded-2xl object-cover" src={item.product_img} alt="" />
                  <span className="ml-4">{item.product_name}</span>
                </CommandItem>
                </Link>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </CommandDialog>
      </>
    );
}

export default SearchToggle