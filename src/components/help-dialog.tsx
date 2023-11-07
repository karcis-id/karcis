import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"

import { Button, buttonVariants } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const HelpDialog = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <QuestionMarkCircledIcon className="mr-2 h-4 w-4" />
          Help
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="space-y-2 w-80">
        <p>
          Thanks for using Karcis! We&apos;re still in development, so if you encounter any bugs or
          need assistance, please contact us! We&apos;re here to help.
        </p>
        <a
          aria-label="contact on whatsapp"
          href="https://wa.me/628127075561"
          target="_blank"
          className={cn(buttonVariants())}
        >
          Contact us
        </a>
      </PopoverContent>
    </Popover>
  )
}

export default HelpDialog
