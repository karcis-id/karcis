"use client"

import { ExitIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { usePathname, useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const router = useRouter()
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
  const [selectValue, setSelectValue] = useState(
    [...items, ...eventItems].filter((i) => pathname === i.href)[0].href,
  )

  const handleValueChange = async (value: string) => {
    if (value === "/sign-out") {
      await fetch("/api/auth/sign-out", {
        method: "POST",
      })
      router.push("/sign-in")
      return
    }
    setSelectValue(value)
    router.push(value)
  }

  // TODO: change to a dropdown (select) when mobile (xs-md)
  return (
    <>
      <nav className={"hidden md:flex gap-2 md:flex-col md:space-y-1"} {...props}>
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
          <Button type="submit" variant="link" className="w-full justify-start text-destructive">
            <ExitIcon className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </form>
      </nav>

      {/* mobile navbar */}
      <nav className="md:hidden">
        <Select value={selectValue} onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {eventItems.length > 0 && (
              <>
                <SelectGroup>
                  <SelectLabel className="font-semibold px-4">{params.eventSlug}</SelectLabel>
                  {eventItems.map((item) => (
                    <SelectItem key={item.href} value={item.href}>
                      {item.title}
                    </SelectItem>
                  ))}
                  <Separator className="hidden md:block" />
                </SelectGroup>
                <SelectSeparator />
              </>
            )}
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.href} value={item.href}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectItem value={"/sign-out"} className="text-destructive">
                Sign out
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </nav>
    </>
  )
}
