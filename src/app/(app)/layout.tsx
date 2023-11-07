import Image from "next/image"
import Link from "next/link"

import HelpDialog from "@/components/help-dialog"
import { ModeToggle } from "@/components/mode-toggle"
import { SidebarNav } from "@/components/sidebar-nav"
import { Separator } from "@/components/ui/separator"

const sidebarNavItems = [
  {
    title: "All events",
    href: "/events",
  },
  {
    title: "Create event",
    href: "/events/new",
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
        <div className="p-4 sm:container flex h-14 items-center justify-between">
          <Link
            href="/events"
            className="block scroll-m-20 text-xl font-semibold tracking-tight sm:w-52 flex gap-1 items-center"
          >
            <Image src="/logo.svg" alt="logo" width={24} height={24} />
            Karcis
          </Link>
          <div className="flex items-center gap-4">
            <HelpDialog />
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="p-4 sm:container flex flex-col md:flex-row gap-4 py-4 h-[calc(100%_-_4.5rem)]">
        <aside className="md:w-64">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <Separator orientation="vertical" className="hidden md:block md:h-full md:w-[1px]" />
        <div className="w-full">{children}</div>
      </div>
    </>
  )
}

export default EventLayout
