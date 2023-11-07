import Image from "next/image"
import Link from "next/link"

import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/components/ui/button"

const navItems = [
  {
    title: "Product",
    href: "/",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "About",
    href: "/about",
  },
]

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="border-b w-full">
        <div className="p-4 sm:container flex h-14 items-center justify-between">
          <Link
            href="/"
            className="block scroll-m-20 text-xl font-semibold tracking-tight sm:w-52 flex gap-1 items-center"
          >
            <Image src="/logo.svg" alt="logo" width={24} height={24} />
            Karcis
          </Link>
          <nav className="hidden md:block space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={buttonVariants({ variant: "ghost" })}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link className={buttonVariants({ variant: "outline" })} href="/events">
              Sign in
            </Link>
            <a href="https://wa.me/628127075561" target="_blank" className={buttonVariants()}>
              Get in touch
            </a>
          </div>
        </div>
      </header>
      <div className="p-4 sm:container w-full">{children}</div>
      <footer className="border-t w-full text-muted-foreground text-sm">
        <div className="p-4 sm:container flex justify-between items-center flex-wrap">
          <p>&copy;Copyright holder</p>
          <div className="flex gap-4 items-center">
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of service</Link>
            <ModeToggle />
          </div>
        </div>
      </footer>
    </>
  )
}

export default PublicLayout
