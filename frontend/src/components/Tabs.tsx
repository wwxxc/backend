'use client'
import React, { useEffect, useState, useRef } from "react";
import CardProduct from "./Card";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Tabs = ({ currentLang }: { currentLang: string }) => {
  const [openTab, setOpenTab] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tabListRef = useRef<HTMLUListElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch images');
      }
    };
    fetchProducts();
  }, []);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabListRef.current && divRef.current) {
      const scrollAmount = direction === 'left' ? -100 : 100;
      tabListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      divRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="flex items-center">
            <button
              className="lg:hidden inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-16 mr-2"
              onClick={() => scrollTabs('left')}
            >
              <ChevronLeft size={20} />
            </button>
            <div
              className="hide-scrollbar -mb-px flex transform items-center gap-2 space-x-3 overflow-hidden duration-300 ease-in-out"
              style={{ whiteSpace: "nowrap", scrollBehavior: "smooth", scrollbarWidth: "none" }}
              ref={divRef}
            >
              <ul
                className="flex mb-0 list-none pt-3 pb-4 flex-row"
                role="tablist"
                ref={tabListRef}
              >
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-md block leading-normal " +
                      (openTab === 1
                        ? "text-white bg-primary"
                        : "text-grey-600 bg-muted/50")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    TopUp Games
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 2
                        ? "text-white bg-primary"
                        : "text-blueGray-600 bg-muted/50")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Voucher
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 3
                        ? "text-white bg-primary"
                        : "text-blueGray-600 bg-muted/50")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(3);
                    }}
                    data-toggle="tab"
                    href="#link3"
                    role="tablist"
                  >
                    E-Wallet
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 4
                        ? "text-white bg-primary"
                        : "text-blueGray-600 bg-muted/50")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(4);
                    }}
                    data-toggle="tab"
                    href="#link4"
                    role="tablist"
                  >
                    Pulsa & Data
                  </a>
                </li>
              </ul>
            </div>
            <button
              className="lg:hidden inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-16 ml-2"
              onClick={() => scrollTabs('right')}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="relative ">
            <div>
              <div className="mt-5">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  {loading ? (
                    <div className="mb-4 grid grid-cols-3 gap-4 sm:mb-8 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-5 xl:grid-cols-6">
                      {[...Array(2)].map((item, index) => (
                        <div
                          key={index}
                          className="group hover:scale-105 relative transform overflow-hidden rounded-2xl bg-muted/30 duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background"
                        >
                          <div className="aspect-[4/6] object-cover object-center" />
                          <article className="absolute inset-x-0 -bottom-10 z-10 flex transform flex-col px-3 transition-all duration-300 ease-in-out group-hover:bottom-3 sm:px-4 group-hover:sm:bottom-4">
                            <h2 className="truncate text-sm font-semibold text-foreground sm:text-xxs"></h2>
                            <p className="truncate text-xs text-foreground sm:text-xs"></p>
                          </article>
                          <div className="absolute inset-0 transform bg-gradient-to-t from-transparent transition-all duration-300 group-hover:bg-gradient-to-top"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <CardProduct ProductData={products} currentLang={currentLang} />
                  )}
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <p>
                    Completely synergize resource taxing relationships via
                    premier niche markets. Professionally cultivate one-to-one
                    customer service with robust ideas.
                    <br />
                    <br />
                    Dynamically innovate resource-leveling customer service for
                    state of the art customer service.
                  </p>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <p>
                    Efficiently unleash cross-media information without
                    cross-media value. Quickly maximize timely deliverables for
                    real-time schemas.
                    <br />
                    <br /> Dramatically maintain clicks-and-mortar solutions
                    without functional solutions.
                  </p>
                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  <p>
                    Streamline your data plan purchases effortlessly. Secure
                    fast and reliable connections anywhere, anytime.
                    <br />
                    <br />
                    Enjoy seamless browsing and streaming with top-notch service
                    quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
