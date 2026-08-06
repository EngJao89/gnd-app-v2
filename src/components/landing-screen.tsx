import { useTranslations } from "next-intl"

import { AuthScreenShell } from "@/components/auth-screen-shell"
import { BrandLogo } from "@/components/brand-logo"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { authActionButtonClassName } from "@/lib/auth-styles"

export function LandingScreen() {
  const t = useTranslations("Landing")

  return (
    <AuthScreenShell className="pt-24">
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <BrandLogo />
        <LocaleSwitcher />
      </div>

      <div className="flex w-full flex-col gap-4">
        <Button asChild className={authActionButtonClassName}>
          <Link href="/sign-in">{t("signIn")}</Link>
        </Button>

        <Button asChild className={authActionButtonClassName}>
          <Link href="/register">{t("registerClient")}</Link>
        </Button>

        <Button asChild className={authActionButtonClassName}>
          <Link href="/stores/register">{t("registerStore")}</Link>
        </Button>

        <Button asChild className={authActionButtonClassName}>
          <Link href="/stores/sign-in">{t("storeSignIn")}</Link>
        </Button>

        <Button
          asChild
          variant="link"
          className="text-sm font-normal text-white underline-offset-4 hover:text-white/90"
        >
          <Link href="/guest">{t("continueWithoutRegistration")}</Link>
        </Button>
      </div>
    </AuthScreenShell>
  )
}
