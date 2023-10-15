import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface infoBoxProps {
  infoTitle: string
  info: string
  title: string
  children: React.ReactNode
}

export const InfoBox = ({ infoTitle, info, title, children }: infoBoxProps) => {
  return (
    <div className="p-2 border border-l-4 rounded relative text-xs">
      <div className="space-y-2">
        <p className="text-sm font-medium leading-none">{title}</p>
        {children}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6"
          >
            <InfoCircledIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        {/* TODO: update explanation popover */}
        <PopoverContent
          side="bottom"
          align="start"
          className="text-sm space-y-2 w-96"
        >
          <p className="font-medium">{infoTitle}</p>
          {info.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
}
