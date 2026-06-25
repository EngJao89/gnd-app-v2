import Image from "next/image"
import Link from "next/link"

import { AppScreenShell } from "@/components/app-screen-shell"
import { Button } from "@/components/ui/button"
import { appBackLinkClassName } from "@/lib/app-styles"

export function SuccessScreen() {
  return (
    <AppScreenShell location="Belmore, Sydney">
      <div className="flex flex-1 flex-col items-center px-6 pb-10 pt-16">
        <Image
          src="/success.png"
          alt=""
          width={160}
          height={160}
          priority
          className="object-contain"
        />

        <h1 className="mt-8 text-2xl font-bold tracking-wide text-foreground uppercase">
          Success!
        </h1>

        <p className="mt-3 text-center text-sm font-bold tracking-wide text-foreground/80 uppercase">
          We are closer than is seems
        </p>

        <Button asChild variant="link" className={`mt-auto ${appBackLinkClassName}`}>
          <Link href="/">Main</Link>
        </Button>
      </div>
    </AppScreenShell>
  )
}
