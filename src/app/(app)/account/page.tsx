"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  password: z
    .string()
    .trim()
    .min(12, { message: "Must be 12 or more characters long" })
    .max(72, { message: "Must be 72 or fewer characters long" }),
  confirmPassword: z
    .string()
    .trim()
    .min(12, { message: "Must be 12 or more characters long" })
    .max(72, { message: "Must be 72 or fewer characters long" }),
})

const Account = () => {
  const { toast } = useToast()
  const supabase = createClientComponentClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { password, confirmPassword } = values
    if (password !== confirmPassword) {
      form.setError("confirmPassword", { type: "manual", message: "Passwords don't match" })
      return
    }
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      console.log(error)
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        variant: "destructive",
      })
      return
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Your account</h1>
      <Separator />
      <div className="md:max-w-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input required type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input required type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update password</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Account
