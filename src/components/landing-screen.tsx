import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const actionButtonClassName = cn(
  "h-12 w-full rounded-full border-2 border-brand bg-white text-lg font-semibold text-brand shadow-md",
  "hover:bg-white/90 hover:text-brand",
  "focus-visible:border-brand focus-visible:ring-brand/30"
)

export function LandingScreen() {
  return (
    <div className="flex h-svh w-full flex-col overflow-hidden bg-brand px-6 pb-10 pt-24 sm:px-10">
      <div className="flex flex-1 items-center justify-center">
        <div className="select-none">
          <p className="text-5xl font-extrabold leading-none tracking-tight text-white">
            Groceries
          </p>
          <div className="mt-1 flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-5xl font-extrabold leading-none tracking-tight text-white">
                Next
              </span>
              <span className="text-5xl font-extrabold leading-none tracking-tight text-white">
                Door
              </span>
            </div>
            <Image
              src="/home-logo.png"
              alt=""
              width={96}
              height={96}
              priority
              className="mix-blend-screen"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <Button asChild className={actionButtonClassName}>
          <Link href="/sign-in">Sign in</Link>
        </Button>

        <Button asChild className={actionButtonClassName}>
          <Link href="/register">Register</Link>
        </Button>

        <Button
          asChild
          variant="link"
          className="text-sm font-normal text-white underline-offset-4 hover:text-white/90"
        >
          <Link href="/guest">Continue without Registration</Link>
        </Button>
      </div>
    </div>
  )
}
