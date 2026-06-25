import Link from "next/link"

import { AuthScreenShell } from "@/components/auth-screen-shell"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import {
  authActionButtonClassName,
  authBackLinkClassName,
} from "@/lib/auth-styles"

export function GuestScreen() {
  return (
    <AuthScreenShell className="pt-24">
      <div className="flex flex-1 items-center justify-center">
        <BrandLogo />
      </div>

      <div className="flex w-full flex-col gap-4">
        <Button asChild className={authActionButtonClassName}>
          <Link href="/guest/qr-code">QR-Code</Link>
        </Button>

        <Button type="button" className={authActionButtonClassName}>
          Enter with keyboard
        </Button>

        <Button asChild variant="link" className={authBackLinkClassName}>
          <Link href="/">Back</Link>
        </Button>
      </div>
    </AuthScreenShell>
  )
}
