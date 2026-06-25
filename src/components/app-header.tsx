import Image from "next/image"

import { cn } from "@/lib/utils"

type AppHeaderProps = {
  className?: string
}

export function AppHeader({ className }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "flex w-full items-center bg-brand px-4 py-3 shadow-md",
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
    </header>
  )
}
