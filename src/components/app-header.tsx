import Image from "next/image"
import { MapPin } from "lucide-react"

import { cn } from "@/lib/utils"

type AppHeaderProps = {
  className?: string
  location?: string
}

export function AppHeader({ className, location }: AppHeaderProps) {
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
    </header>
  )
}
