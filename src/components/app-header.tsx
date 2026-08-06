"use client"

import Image from "next/image"
import { LogOut, MapPin, Plus, ShoppingBasket, Store } from "lucide-react"
import { useTranslations } from "next-intl"
import type { ComponentProps } from "react"
import { toast } from "react-toastify"

import { Link, useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { signOut } from "@/services/auth"

type Href = ComponentProps<typeof Link>["href"]

type AppHeaderProps = {
  className?: string
  location?: string
  showAddProduct?: boolean
  addProductHref?: Href
  showStoreProfile?: boolean
  storeProfileHref?: Href
  showCartIcon?: boolean
  showCartBadge?: boolean
  showLogout?: boolean
  cartHref?: Href
}

export function AppHeader({
  className,
  location,
  showAddProduct,
  addProductHref = "/products/new",
  showStoreProfile,
  storeProfileHref = "/stores/profile",
  showCartIcon,
  showCartBadge,
  showLogout,
  cartHref = "/cart",
}: AppHeaderProps) {
  const t = useTranslations("Header")
  const tCommon = useTranslations("Common")
  const router = useRouter()

  function handleLogout() {
    signOut()
    toast.success(t("loggedOut"))
    router.push("/")
  }

  return (
    <header
      className={cn(
        "relative flex w-full items-center bg-brand px-4 py-3 shadow-md",
        className
      )}
    >
      <Image
        src="/header-logo.png"
        alt={tCommon("logoAlt")}
        width={40}
        height={40}
        priority
        className="mix-blend-screen"
      />

      {location ? (
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-sm font-medium text-white">
          <MapPin className="size-4 shrink-0" aria-hidden />
          <span>{location}</span>
        </div>
      ) : null}

      {showAddProduct || showStoreProfile || showCartIcon || showLogout ? (
        <div className="ml-auto flex items-center gap-2">
          {showAddProduct ? (
            <Link
              href={addProductHref}
              className="flex size-10 items-center justify-center rounded-lg border-2 border-white text-white transition-colors hover:bg-white/10"
              aria-label={t("addProduct")}
            >
              <Plus className="size-5" />
            </Link>
          ) : null}

          {showStoreProfile ? (
            <Link
              href={storeProfileHref}
              className="flex size-10 items-center justify-center rounded-lg border-2 border-white text-white transition-colors hover:bg-white/10"
              aria-label={t("storeProfile")}
            >
              <Store className="size-5" />
            </Link>
          ) : null}

          {showCartIcon ? (
            <Link
              href={cartHref}
              className="relative flex size-10 items-center justify-center rounded-lg border-2 border-white"
              aria-label={t("openCart")}
            >
              <ShoppingBasket className="size-5 text-white" />
              {showCartBadge ? (
                <span className="absolute -bottom-0.5 -left-0.5 size-2.5 rounded-full bg-red-500" />
              ) : null}
            </Link>
          ) : null}

          {showLogout ? (
            <button
              type="button"
              onClick={handleLogout}
              className="flex size-10 items-center justify-center rounded-lg border-2 border-white text-white transition-colors hover:bg-white/10"
              aria-label={t("logOut")}
            >
              <LogOut className="size-5" />
            </button>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
