import { Separator } from "@/components/ui/separator"

const Account = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Your account
        </h1>
        <p className="text-muted-foreground">Helpful description here...</p>
      </div>
      <Separator />
      <div>content goes here</div>
    </div>
  )
}

export default Account
