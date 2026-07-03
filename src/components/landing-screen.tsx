import Link from "next/link"

import { AuthScreenShell } from "@/components/auth-screen-shell"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { authActionButtonClassName } from "@/lib/auth-styles"

export function LandingScreen() {
  return (
    <AuthScreenShell className="pt-24">
      <div className="flex flex-1 items-center justify-center">
        <BrandLogo />
      </div>

      <div className="flex w-full flex-col gap-4">
        <Button asChild className={authActionButtonClassName}>
          <Link href="/sign-in">Sign in</Link>
        </Button>

        <Button asChild className={authActionButtonClassName}>
          <Link href="/register">Register Client</Link>
        </Button>

        <Button asChild className={authActionButtonClassName}>
          <Link href="/stores/register">Register Store</Link>
        </Button>

        <Button asChild className={authActionButtonClassName}>
          <Link href="/stores/sign-in">Store Sign in</Link>
        </Button>

        <Button
          asChild
          variant="link"
          className="text-sm font-normal text-white underline-offset-4 hover:text-white/90"
        >
          <Link href="/guest">Continue without Registration</Link>
        </Button>
      </div>
    </AuthScreenShell>
  )
}
