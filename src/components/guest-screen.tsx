import { useTranslations } from "next-intl"

import { AuthScreenShell } from "@/components/auth-screen-shell"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import {
  authActionButtonClassName,
  authBackLinkClassName,
} from "@/lib/auth-styles"

export function GuestScreen() {
  const t = useTranslations("Guest")
  const tCommon = useTranslations("Common")

  return (
    <AuthScreenShell className="pt-24">
      <div className="flex flex-1 items-center justify-center">
        <BrandLogo />
      </div>

      <div className="flex w-full flex-col gap-4">
        <Button asChild className={authActionButtonClassName}>
          <Link href="/guest/qr-code">{t("qrCode")}</Link>
        </Button>

        <Button asChild className={authActionButtonClassName}>
          <Link href="/guest/enter-code">{t("enterWithKeyboard")}</Link>
        </Button>

        <Button asChild variant="link" className={authBackLinkClassName}>
          <Link href="/">{tCommon("back")}</Link>
        </Button>
      </div>
    </AuthScreenShell>
  )
}
