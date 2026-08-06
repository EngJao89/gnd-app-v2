import type { ComponentProps } from "react"

import { AppHeader } from "@/components/app-header"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

type Href = ComponentProps<typeof Link>["href"]

type AppScreenShellProps = {
  children: React.ReactNode
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

export function AppScreenShell({
  children,
  className,
  location,
  showAddProduct,
  addProductHref,
  showStoreProfile,
  storeProfileHref,
  showCartIcon,
  showCartBadge,
  showLogout,
  cartHref,
}: AppScreenShellProps) {
  return (
    <div className={cn("flex min-h-svh w-full flex-col bg-white", className)}>
      <AppHeader
        location={location}
        showAddProduct={showAddProduct}
        addProductHref={addProductHref}
        showStoreProfile={showStoreProfile}
        storeProfileHref={storeProfileHref}
        showCartIcon={showCartIcon}
        showCartBadge={showCartBadge}
        showLogout={showLogout}
        cartHref={cartHref}
      />
      {children}
    </div>
  )
}
