import Carousel from "@/components/Carousel";
import PopularPage from "@/components/PopularPage";
import Tabs from "@/components/Tabs";
import { ResolvingMetadata, Metadata } from 'next';
type Props = {
  params: { [lang: string]: string };
};


export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
   
    const home: Home = await fetch(API_URL + '/home').then((res) => res.json())   
    const previousImages = (await parent).openGraph?.images || []
   
    return {
      title: home.title + ' - ' + home.description,
      description: home.description,
      keywords: home.title,
      icons: {
        icon: home.url_favicon,
      },
      openGraph: {
        images: ['/.jpg', ...previousImages],
      },
    }
  }

export default async function HomePage({ params: { lang } }: Props) {

  return (
    <div>
      <main className="relative bg-background-foreground">
        <section className="relative flex items-center overflow-hidden px-4 py-4 lg:min-h-[521.96px]">
          <div className="container">
            {/* {sliders && <Carousel images={sliders}/>} */}
            <Carousel /> 
          </div>
        </section>
      </main>
      <main className="h-screen w-full bg-background">
        <div className="flex flex-col gap-y-8 pt-8">
          <div className="container">
            <PopularPage currentLang={lang} />
          </div>
          <div className="container">
            <Tabs currentLang={lang} />
          </div>
        </div>
      </main>
    </div>
  );
}
