import WinRatePage from "@/components/WinRate";
import { Metadata, ResolvingMetadata } from "next";
import { getDictionary } from "../../dictionaries";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

 
type Props = {
    params: { id: string, [key: string]: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
 
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {

    const home: Home = await fetch(API_URL + '/home').then((res) => res.json())
    const previousImages = (await parent).openGraph?.images || []
    return {
      title: 'Winrate Calculator' + ' / ' + home.title + ' - ' + home.description,
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
  
const Winrate = async ({ params: { lang } }: { params: { lang: string } }) => {
    const home: Home = await fetch(API_URL + '/home').then((res) => res.json())
    const dict = await getDictionary(lang);
    return (
        <main>
            <WinRatePage home={home} dict={dict} />
        </main>
    )
}

export default Winrate