"use client"
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { ExitIcon } from "@radix-ui/react-icons"
import { Separator } from "./ui/separator"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const params = useParams()

  const eventItems =
    (pathname.startsWith("/events/") &&
      params.eventSlug && [
        // {
        //   href: `/events/${params.eventSlug}/overview`,
        //   title: "Event overview",
        // },
        {
          href: `/events/${params.eventSlug}/dashboard`,
          title: "Dashboard",
        },
        {
          href: `/events/${params.eventSlug}/scan`,
          title: "Scan code",
        },
      ]) ||
    []

  // TODO: change to a dropdown (select) when mobile (xs-md)
  return (
    <nav
      className={cn("flex gap-2 md:flex-col md:space-y-1", className)}
      {...props}
    >
      {eventItems.length > 0 && (
        <>
          <p className="font-semibold px-4">{params.eventSlug}</p>
          {eventItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start",
              )}
            >
              {item.title}
            </Link>
          ))}
          <Separator className="hidden md:block" />
        </>
      )}

      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.title}
        </Link>
      ))}

      <Separator className="hidden md:block" />

      <form action="/api/auth/sign-out" method="POST">
        <Button
          type="submit"
          variant="link"
          className="w-full justify-start text-destructive"
        >
          <ExitIcon className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </form>
    </nav>
  )
}
