"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().trim().email(),
  password: z
    .string()
    .trim()
    .min(12, { message: "Must be 12 or more characters long" })
    .max(72, { message: "Must be 72 or fewer characters long" }),
})

const SignIn = () => {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // TODO: replace auth helpers with @supabase/ssr smh
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.log(error)
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        variant: "destructive",
      })
      return
    }
    // TODO: loading state
    router.push("/events")
  }

  return (
    <>
      <div className="bg-muted min-h-screen px-2 py-8 space-y-10">
        <Link
          href="/"
          className="block text-center scroll-m-20 text-xl font-semibold tracking-tight"
        >
          Karcis
        </Link>
        <h1 className="text-center scroll-m-20 text-3xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <Card className="max-w-md mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardHeader>
                <CardTitle>Sign in with email</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          required
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input required type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        <p className="text-center text-sm">
          {"Don't have an account? "}
          <a
            href="mailto:hi@ryanmartin.me"
            className="text-primary font-semibold underline-offset-4 hover:underline"
          >
            Contact us!
          </a>
        </p>
      </div>
    </>
  )
}

export default SignIn
