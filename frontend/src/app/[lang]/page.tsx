import Carousel from "@/components/Carousel";
import PopularPage from "@/components/PopularPage";
import Tabs from "@/components/Tabs";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const images = [
    'https://via.placeholder.com/800x400?text=Slide+1',
    'https://via.placeholder.com/800x400?text=Slide+2',
    'https://via.placeholder.com/800x400?text=Slide+3',
  ];
  return (
    <div>
      <main className="relative bg-background-foreground">
        <section className="relative flex items-center overflow-hidden px-4 py-4 lg:min-h-[521.96px]">
          <div className="container">
          <Carousel images={images}/>
          </div>
        </section>
      </main>
      <main className="h-screen w-full bg-background">
        <div className="flex flex-col gap-y-8 pt-8">
          <div className="container">
            <PopularPage />
          </div>
          <div className="container">
            <Tabs />
          </div>
        </div>
      </main>
    </div>
  );
}
