import Link from "next/link"

import { AppScreenShell } from "@/components/app-screen-shell"
import { QrCodeDisplay } from "@/components/qr-code-display"
import { Button } from "@/components/ui/button"
import { appBackLinkClassName, GUEST_QR_CODE } from "@/lib/app-styles"

export function QrCodeScreen() {
  return (
    <AppScreenShell>
      <div className="flex flex-1 flex-col items-center px-6 pb-10 pt-12">
        <div className="rounded-3xl border-4 border-brand bg-brand-bright p-5 shadow-lg">
          <div className="flex flex-col items-center gap-4 bg-white px-5 py-6">
            <QrCodeDisplay value={GUEST_QR_CODE} />
            <p className="text-center text-sm font-medium tracking-wide text-foreground">
              {GUEST_QR_CODE}
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-sm font-bold tracking-wide text-foreground uppercase">
          Point your camera to QR-Code
        </p>

        <Button asChild variant="link" className={`mt-auto ${appBackLinkClassName}`}>
          <Link href="/guest">Back</Link>
        </Button>
      </div>
    </AppScreenShell>
  )
}
