import Image from "next/image"
import { useTranslations } from "next-intl"

import { AppScreenShell } from "@/components/app-screen-shell"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { appBackLinkClassName } from "@/lib/app-styles"

export function SuccessScreen() {
  const t = useTranslations("Success")
  const tCommon = useTranslations("Common")

  return (
    <AppScreenShell location={tCommon("location")}>
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
          {t("title")}
        </h1>

        <p className="mt-3 text-center text-sm font-bold tracking-wide text-foreground/80 uppercase">
          {t("message")}
        </p>

        <Button asChild variant="link" className={`mt-auto ${appBackLinkClassName}`}>
          <Link href="/">{tCommon("main")}</Link>
        </Button>
      </div>
    </AppScreenShell>
  )
}
