import { AppHeader } from "@/components/app-header"
import { cn } from "@/lib/utils"

type AppScreenShellProps = {
  children: React.ReactNode
  className?: string
  location?: string
}

export function AppScreenShell({
  children,
  className,
  location,
}: AppScreenShellProps) {
  return (
    <div className={cn("flex min-h-svh w-full flex-col bg-white", className)}>
      <AppHeader location={location} />
      {children}
    </div>
  )
}
