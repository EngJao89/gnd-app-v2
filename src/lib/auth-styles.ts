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

export const authCheckboxClassName = cn(
  "size-5 rounded border-2 border-white bg-white",
  "data-checked:border-white data-checked:bg-white data-checked:text-brand",
  "focus-visible:border-white focus-visible:ring-white/30"
)

export const authBackLinkClassName =
  "text-sm font-normal text-white underline-offset-4 hover:text-white/90"
