import Image from "next/image"

import { cn } from "@/lib/utils"

type BrandLogoProps = {
  size?: "hero" | "compact"
  className?: string
}

const textSizes = {
  hero: "text-5xl",
  compact: "text-3xl",
} as const

const iconSizes = {
  hero: 96,
  compact: 64,
} as const

export function BrandLogo({ size = "hero", className }: BrandLogoProps) {
  const textSize = textSizes[size]
  const iconSize = iconSizes[size]

  return (
    <div className={cn("select-none", className)}>
      <p
        className={cn(
          "font-extrabold leading-none tracking-tight text-white",
          textSize
        )}
      >
        Groceries
      </p>
      <div className="mt-1 flex items-center gap-3">
        <div className="flex flex-col">
          <span
            className={cn(
              "font-extrabold leading-none tracking-tight text-white",
              textSize
            )}
          >
            Next
          </span>
          <span
            className={cn(
              "font-extrabold leading-none tracking-tight text-white",
              textSize
            )}
          >
            Door
          </span>
        </div>
        <Image
          src="/home-logo.png"
          alt=""
          width={iconSize}
          height={iconSize}
          priority={size === "hero"}
          className="mix-blend-screen"
        />
      </div>
    </div>
  )
}
