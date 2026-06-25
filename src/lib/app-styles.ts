import { cn } from "@/lib/utils"

export const appBackLinkClassName =
  "text-sm font-normal text-foreground underline-offset-4 hover:text-foreground/80"

export const GUEST_QR_CODE = "JMDW3-NND89-YCBDJ-JD787"

export const appInputClassName = cn(
  "h-12 w-full rounded-full border-2 border-brand bg-white px-4 text-base shadow-md",
  "focus-visible:border-brand focus-visible:ring-brand/30"
)

export const appSubmitButtonClassName = cn(
  "h-12 w-full rounded-full border-2 border-white bg-brand text-lg font-semibold text-white shadow-md",
  "hover:bg-brand/90",
  "focus-visible:border-brand focus-visible:ring-brand/30"
)
