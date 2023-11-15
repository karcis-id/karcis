import { EnvelopeClosedIcon, PlayIcon } from "@radix-ui/react-icons"
import Image from "next/image"

import Mascot from "@/components/mascot"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { CONTACT_LINK, FAQS, FEATURES, TESTIMONIALS } from "./constants"

const Home = () => {
  return (
    <div className="space-y-28">
      <div className="bg-gradient-to-b from-muted to-background h-[52rem] absolute w-full -z-10 top-0 left-0 rounded-b-3xl" />
      <section className="md:pt-8">
        <div className="text-center max-w-4xl space-y-6 mx-auto">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-7xl">
            The <span className="underline decoration-8">simplest</span> event ticketing solution
          </h1>
          <p className="lg:text-xl">
            Karcis streamlines event ticketing and attendee management.
            <br className="hidden sm:block" />
            It&apos;s the easiest and most affordable way to automate your processes
          </p>
          <a
            href={CONTACT_LINK}
            target="_blank"
            className={cn(buttonVariants(), "text-lg px-6 py-5")}
          >
            <EnvelopeClosedIcon className="mr-4 h-6 w-6" />
            Get in touch
          </a>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col mt-4">
          <div className="w-40 md:w-64 self-end mr-8 md:mr-16 -mb-2 hover:cursor-pointer transition hover:translate-y-4 md:hover:translate-y-10 ease-linear duration-100">
            <Mascot className="fill-foreground" />
          </div>
          <AspectRatio
            ratio={16 / 9}
            className="border rounded-lg shadow-lg relative z-10 flex items-center justify-center mb-4"
          >
            <Image src="/ss.png" alt="screenshot" fill />
            <div className="absolute opacity-30 filter blur-sm w-full h-full top-0 left-0 bg-gradient-to-t from-slate-800 to-none" />
            <div
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "rounded-full h-20 w-20 z-10 hover:cursor-pointer",
              )}
            >
              <PlayIcon className="ml-1 h-12 w-12 text-muted-foreground" />
            </div>
          </AspectRatio>
        </div>
      </section>
      <section className="space-y-8">
        <div className="text-center max-w-3xl space-y-6 mx-auto">
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">
            What&apos;s included?
          </h2>
          <p className="lg:text-xl">
            Karcis provides you with all the essential tools to effortlessly manage your event
            attendees, so you can focus on delivering an outstanding event experience.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:px-16">
          {FEATURES.map((f, i) => (
            <Card key={i} className="p-4 space-y-2">
              <div className="p-2 rounded bg-primary text-primary-foreground inline-block">
                <f.icon className="h-6 w-6" />
              </div>
              <CardTitle>{f.title}</CardTitle>
              <p>{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="space-y-8">
        <div className="text-center max-w-3xl space-y-6 mx-auto">
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">
            What our users say
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-muted text-muted-foreground p-4 rounded-md space-y-2">
              <p>{t.content}</p>
              <p className="text-foreground font-semibold">
                <em>–{t.author}</em>
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-8">
        <div className="text-center max-w-3xl space-y-6 mx-auto">
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">
            Straightforward pricing
          </h2>
        </div>
        <Card className="max-w-3xl mx-auto bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-2xl">We charge</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl tracking-tight font-bold">
              Rp 5,000 <span className="text-2xl font-semibold">/ &nbsp;Ticket</span>
            </p>
          </CardContent>
          <CardFooter className="flex-col gap-2 items-start">
            <p>No monthly subscriptions. No hidden fees. Just pay for what you use.</p>
            <a
              href={CONTACT_LINK}
              target="_blank"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "w-full text-center text-lg py-5",
              )}
            >
              Get started now
            </a>
          </CardFooter>
        </Card>
      </section>
      <section className="space-y-8">
        <div className="text-center max-w-3xl space-y-6 mx-auto">
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">
            Frequently Asked Questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="max-w-4xl mx-auto">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={i.toString()}>
              <AccordionTrigger className="md:text-lg text-left">{f.question}</AccordionTrigger>
              <AccordionContent className="md:text-lg text-left">{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <section className="space-y-8 pb-24">
        {/* <div className="text-center max-w-3xl space-y-6 mx-auto"> */}
        {/*   <h3 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-4xl"> */}
        {/*     Ready to try? */}
        {/*   </h3> */}
        {/*   <a href="mailto:hi@ryanmartin.me" className={cn(buttonVariants(), "text-lg px-6 py-5")}> */}
        {/*     Contact us! */}
        {/*     <ArrowRightIcon className="ml-4 h-6 w-6" /> */}
        {/*   </a> */}
        {/* </div> */}
      </section>
    </div>
  )
}

export default Home
