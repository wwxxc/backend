import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-full h-full mt-40 flex flex-col items-center justify-center'>
      <h2 className='text-primary'>404</h2>
      <h1 className='text-3xl font-bold'>Page Not Found</h1>
      <span>Sorry, we couldn&apos;t find the page you&apos;re looking for.</span>
      <Link className='mt-10' href="/">Return Home</Link>
    </div>
  )
}