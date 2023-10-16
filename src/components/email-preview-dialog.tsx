import { EyeOpenIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface EmailPreviewDialogProps {
  subject: string
  emailBody: string
}

// TODO: create a format body function (text -> html)
export const EmailPreviewDialog = ({ subject, emailBody }: EmailPreviewDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" type="button">
          <EyeOpenIcon className="mr-2 h-4 w-4" />
          Preview template
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Email template preview</DialogTitle>
          <DialogDescription>Subject heading: {subject}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 border rounded p-2 text-sm">
          {emailBody.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
