"use client"
import { NextPage } from "next"
import { useState } from "react"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const SignIn: NextPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("a")

  const supabase = createClientComponentClient()

  // TODO: update to signInWithOTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      // TODO: handle error state here
      console.log(error)
    }
  }

  return (
    <>
      <div className="bg-slate-100 min-h-screen px-2 py-8 space-y-10">
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
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Sign in with email</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </CardFooter>
          </form>
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
