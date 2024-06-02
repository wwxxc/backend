import Carousel from "@/components/Carousel";
import Image from "next/image";

export default function HomePage() {
  const images = [
    'https://via.placeholder.com/800x400?text=Slide+1',
    'https://via.placeholder.com/800x400?text=Slide+2',
    'https://via.placeholder.com/800x400?text=Slide+3',
  ];
  return (
    <div>
      <main className="relative bg-gradient-primary">
        <section className="relative flex items-center overflow-hidden px-4 py-4 lg:min-h-[521.96px]">
          <div className="container">
          <Carousel images={images}/>
          </div>
        </section>
      </main>
      <main className="h-screen w-full bg-gradient-secondary">
        <h1 className="text-black">Page 2</h1>
      </main>
    </div>
  );
}
