"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { NextPage } from "next"
import { useState } from "react"

const SignIn: NextPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const supabase = createClientComponentClient()

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">sign in</button>
      </form>
    </>
  )
}

export default SignIn
