import Markdown from "react-markdown"

import { cn } from "@/lib/utils"
import style from "@/styles/legal.module.css"

import { INTRO, data } from "./constants"

const PrivacyPolicy = () => {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <section className="space-y-2">
        <h1 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
          PRIVACY POLICY
        </h1>
        <p className="text-muted-foreground text-center">Last updated November 13, 2023</p>
        <Markdown className={cn(style.legal, "space-y-2")}>{INTRO}</Markdown>
      </section>
      {data.map((e) => (
        <section key={e.id}>
          <h2 id={e.id} className="scroll-m-20 text-xl font-semibold tracking-tight">
            {e.title}
          </h2>
          <Markdown className={cn(style.legal, "space-y-2")}>{e.content}</Markdown>
        </section>
      ))}
    </div>
  )
}

export default PrivacyPolicy
