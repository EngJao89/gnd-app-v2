import { AppHeader } from "@/components/app-header"
import { cn } from "@/lib/utils"

type AppScreenShellProps = {
  children: React.ReactNode
  className?: string
}

export function AppScreenShell({ children, className }: AppScreenShellProps) {
  return (
    <div className={cn("flex min-h-svh w-full flex-col bg-white", className)}>
      <AppHeader />
      {children}
    </div>
  )
}
