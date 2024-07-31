import SearchInvoice from "@/components/SearchInvoice";
import { ResolvingMetadata, Metadata } from "next";
import { getDictionary } from "../dictionaries";
type Props = {
    params: { [lang: string]: string };
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {

    const home: Home = await fetch(API_URL + '/home').then((res) => res.json())
    const previousImages = (await parent).openGraph?.images || []
    return {
      title: 'Search Invoice ' + ' / ' + home.title + ' - ' + home.description,
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

const InvoicePage = async ({ params: { lang } }: Props) => {
    const dict = await getDictionary(lang);
    return ( 
        <section className="bg-[#393E46]">
            <SearchInvoice lang={lang} dict={dict}/>
        </section>
    )
}

export default InvoicePage