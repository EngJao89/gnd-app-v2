import { CreditCard } from "lucide-react"
import { useTranslations } from "next-intl"

import { AppScreenShell } from "@/components/app-screen-shell"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { appBackLinkClassName, appPaymentButtonClassName } from "@/lib/app-styles"

export function CartScreen() {
  const t = useTranslations("Cart")
  const tCommon = useTranslations("Common")

  return (
    <AppScreenShell location={tCommon("location")} showCartIcon>
      <div className="flex flex-1 flex-col px-6 pb-10 pt-8">
        <div className="flex min-h-48 items-center justify-center rounded-2xl border-2 border-border">
          <p className="text-lg text-muted-foreground">{t("empty")}</p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">{t("total")}</span>
          <span className="text-lg font-bold text-foreground">$0</span>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <Button type="button" className={appPaymentButtonClassName}>
            <span className="text-lg font-medium tracking-tight">
              {t("applePay")}
            </span>
          </Button>

          <Button type="button" className={appPaymentButtonClassName}>
            <span className="rounded bg-[#5a6b7d] px-3 py-1 text-lg font-bold tracking-wide text-white">
              {t("bpay")}
            </span>
          </Button>

          <Button type="button" className={appPaymentButtonClassName}>
            <span className="flex items-center gap-2 text-base font-medium">
              {t("debitCredit")}
              <CreditCard className="size-5" aria-hidden />
            </span>
          </Button>
        </div>

        <Button asChild variant="link" className={`mt-auto ${appBackLinkClassName}`}>
          <Link href="/">{tCommon("back")}</Link>
        </Button>
      </div>
    </AppScreenShell>
  )
}
