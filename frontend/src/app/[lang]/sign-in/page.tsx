import { X } from "lucide-react"
import Link from "next/link"
import { Lock } from "lucide-react"

const SignIn = () => {
    return(
        <>
        <main className="bg-gradient-secondary">
        <div className="absolute left-4 top-4 z-50">
            <Link href={'/'} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-black text- hover:bg-muted h-9 w-9">
                <X />
            </Link>
        </div>
        <div className="relative flex min-h-dvh shrink-0 justify-center md:px-12 lg:px-0">
            <div className="relative z-10 flex flex-1 flex-col justify-center bg-gradient-to-top px-4 py-10 md:flex-none md:px-24">
                <div className="mx-auto w-full max-w-md sm:px-4 md:w-[400px] md:px-0">
                    <div className="mx-auto w-full max-w-md space-y-8 lg:mx-0">
                        <div>
                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                Masuk
                            </h2>
                            <p className="mt-2 text-sm text-foreground">
                                Masuk dengan akun yang telah Anda daftarkan.
                            </p>
                        </div>
                        <form action="#" className="mt-8 space-y-6">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="space-y-3 rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="username" className="block text-xs font-medium text-foreground pb-2">Username</label>
                                    <div className="flex flex-col items-start">
                                        <input type="text" id="username" placeholder="Username" name="username" className="relative block w-full appearance-none rounded-lg border border-border bg-input px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-xs font-medium text-foreground pb-2">Kata Sandi</label>
                                    <div className="relative">
                                        <div className="flex flex-col items-start">
                                            <input type="text" id="password" placeholder="Kata Sandi" name="password" className="relative block w-full appearance-none rounded-lg border border-border bg-input px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input type="checkbox" id="remember-me" name="remember-me" className="border-murky-600 bg-murky-700 focus:ring-primary-400 focus:ring-offset-murky-900 h-4 w-4 cursor-pointer rounded text-primary" />
                                    <label htmlFor="remember-me" className="block font-medium ml-3 select-none text-sm text-foreground">Ingat akun ku</label>
                                </div>
                            </div>
                            <div>

                            </div>
                            <div>
                                <button type="submit" className="items-center text-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white duration-300 disabled:cursor-not-allowed disabled:opacity-75 group relative flex w-full hover:bg-primary/75">
                                Masuk
                                </button>
                            </div>
                            <div className="relative mt-6">
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 text-foreground">
                                        Belum memiliki akun?
                                    </span>
                                </div>
                            </div>
                            <div>
                                <Link href={'/sign-up'} className="items-center justify-center rounded-lg px-4 py-3 text-sm font-medium duration-300 group relative flex w-full bg-muted text-muted-foreground hover:bg-muted/75">
                                    Daftar
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="hidden sm:block lg:flex-1 xl:relative">
                <div className="size-full bg-primary"></div>
            </div>
        </div>
        </main>
        </>
    )
}

export default SignIn