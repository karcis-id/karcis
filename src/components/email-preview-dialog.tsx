import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { EyeOpenIcon } from "@radix-ui/react-icons"

interface EmailPreviewDialogProps {
  subject: string
  emailBody: string
}

// TODO: create a format body function (text -> html)
export const EmailPreviewDialog = ({
  subject,
  emailBody,
}: EmailPreviewDialogProps) => {
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
        <div className="space-y-2 border rounded p-2">
          {emailBody}
          {/* <p> */}
          {/*   Dear &nbsp; */}
          {/*   <code className="bg-muted px-[0.2rem] py-[0.1rem] font-mono font-semibold rounded-sm border text-sm"> */}
          {/*     {"{{ name }}"} */}
          {/*   </code> */}
          {/*   , */}
          {/* </p> */}
          {/* <p> */}
          {/*   We&apos;re excited to have you join us at PKPM 2023! Here are the */}
          {/*   key details: */}
          {/* </p> */}
          {/* <ul className="ml-6 list-disc"> */}
          {/*   <li> */}
          {/*     <span className="font-medium">Location:&nbsp;</span>Kampus Binus */}
          {/*     Kemanggisan */}
          {/*   </li> */}
          {/*   <li> */}
          {/*     <span className="font-medium">Date:&nbsp;</span>Tuesday, 10 Oct */}
          {/*     2023 */}
          {/*   </li> */}
          {/*   <li> */}
          {/*     <span className="font-medium">Time:&nbsp;</span>08:00 WIB */}
          {/*   </li> */}
          {/* </ul> */}
          {/* <p> */}
          {/*   Please arrive a bit early with this QR code for a smooth check-in. */}
          {/* </p> */}
          {/* <div className="h-48 w-48 relative border rounded ml-6"> */}
          {/*   <Image src="/sample-qr.png" alt="sample qr code" fill /> */}
          {/* </div> */}
          {/* <p>Any questions? Contact us at support@pkpm2023.com</p> */}
          {/* <p>See you there!</p> */}
          {/* <p> */}
          {/*   Best regards, */}
          {/*   <br /> */}
          {/*   Michelle W. */}
          {/* </p> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
