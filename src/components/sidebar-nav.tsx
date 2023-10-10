"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { ExitIcon } from "@radix-ui/react-icons"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  // TODO: perhaps change to a dropdown if we have more links in the future
  return (
    <nav
      className={cn("flex gap-2 md:flex-col md:space-y-1", className)}
      {...props}
    >
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

      <form action="/api/auth/sign-out" method="POST">
        <Button
          type="submit"
          variant="link"
          className="w-full justify-start text-black"
        >
          <ExitIcon className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </form>
    </nav>
  )
}
