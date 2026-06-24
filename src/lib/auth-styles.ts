import { cn } from "@/lib/utils"

export const authActionButtonClassName = cn(
  "h-12 w-full rounded-full border-2 border-brand bg-white text-lg font-semibold text-brand shadow-md",
  "hover:bg-white/90 hover:text-brand",
  "focus-visible:border-brand focus-visible:ring-brand/30"
)

export const authInputClassName = cn(
  "h-12 rounded-full border-0 bg-white px-4 text-base text-foreground shadow-md",
  "placeholder:text-muted-foreground",
  "focus-visible:border-brand focus-visible:ring-brand/30"
)

export const authLabelClassName = "text-base font-medium text-white"
