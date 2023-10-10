import Link from "next/link"
import { SunIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { SidebarNav } from "@/components/sidebar-nav"
import { Separator } from "@/components/ui/separator"

const sidebarNavItems = [
  {
    title: "Events",
    href: "/events",
  },
  {
    title: "Account",
    href: "/account",
  },
]

const EventLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="border-b w-full">
        <div className="container flex h-14 items-center justify-between">
          <Link
            href="/"
            className="block text-center scroll-m-20 text-xl font-semibold tracking-tight"
          >
            Karcis
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <QuestionMarkCircledIcon className="mr-2 h-4 w-4" />
              Help
            </Button>
            <Button variant="outline" size="icon">
              <SunIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>
      <div className="container flex flex-col md:flex-row gap-4 py-4 h-[calc(100%_-_4.5rem)]">
        <aside className="md:w-64">
          <SidebarNav items={sidebarNavItems} className="overflow-x-auto" />
        </aside>
        <Separator
          orientation="vertical"
          className="h-[1px] w-full md:h-full md:w-[1px]"
        />
        <div className="w-full">{children}</div>
      </div>
    </>
  )
}

export default EventLayout
