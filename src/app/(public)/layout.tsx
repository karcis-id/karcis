import Link from "next/link"

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
          <Link href="/" className="block scroll-m-20 text-xl font-semibold tracking-tight w-52">
            Karcis
          </Link>
          <nav className="space-x-2">
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
            <a href="mailto:hi@ryanmartin.me" className={buttonVariants()}>
              Get in touch
            </a>
          </div>
        </div>
      </header>
      <div className="p-4 sm:container">{children}</div>
    </>
  )
}

export default PublicLayout
