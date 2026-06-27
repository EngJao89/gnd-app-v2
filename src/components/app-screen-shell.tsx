import { AppHeader } from "@/components/app-header"
import { cn } from "@/lib/utils"

type AppScreenShellProps = {
  children: React.ReactNode
  className?: string
  location?: string
  showCartIcon?: boolean
}

export function AppScreenShell({
  children,
  className,
  location,
  showCartIcon,
}: AppScreenShellProps) {
  return (
    <div className={cn("flex min-h-svh w-full flex-col bg-white", className)}>
      <AppHeader location={location} showCartIcon={showCartIcon} />
      {children}
    </div>
  )
}
