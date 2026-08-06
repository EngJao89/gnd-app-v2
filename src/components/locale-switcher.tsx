"use client"

import { useLocale, useTranslations } from "next-intl"

import { usePathname, useRouter } from "@/i18n/navigation"
import { routing, type Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"

type LocaleSwitcherProps = {
  className?: string
}

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const t = useTranslations("LocaleSwitcher")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function handleChange(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale as Locale })
  }

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <label htmlFor="locale-switcher" className="sr-only">
        {t("label")}
      </label>
      <select
        id="locale-switcher"
        value={locale}
        onChange={(event) => handleChange(event.target.value)}
        className="rounded-md border border-white/30 bg-transparent px-2 py-1 text-sm text-white outline-none"
      >
        {routing.locales.map((item) => (
          <option key={item} value={item} className="text-foreground">
            {t(item)}
          </option>
        ))}
      </select>
    </div>
  )
}
