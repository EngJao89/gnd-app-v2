import Image from "next/image"
import Link from "next/link"
import { MapPin, ShoppingBasket } from "lucide-react"

import { cn } from "@/lib/utils"

type AppHeaderProps = {
  className?: string
  location?: string
  showCartIcon?: boolean
  showCartBadge?: boolean
  cartHref?: string
}

export function AppHeader({
  className,
  location,
  showCartIcon,
  showCartBadge,
  cartHref = "/cart",
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "relative flex w-full items-center bg-brand px-4 py-3 shadow-md",
        className
      )}
    >
      <Image
        src="/header-logo.png"
        alt="Groceries Next Door"
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

      {showCartIcon ? (
        <Link
          href={cartHref}
          className="relative ml-auto flex size-10 items-center justify-center rounded-lg border-2 border-white"
          aria-label="Open cart"
        >
          <ShoppingBasket className="size-5 text-white" />
          {showCartBadge ? (
            <span className="absolute -bottom-0.5 -left-0.5 size-2.5 rounded-full bg-red-500" />
          ) : null}
        </Link>
      ) : null}
    </header>
  )
}
