import { cn } from "@/lib/utils"

type AuthScreenShellProps = {
  children: React.ReactNode
  className?: string
}

export function AuthScreenShell({ children, className }: AuthScreenShellProps) {
  return (
    <div
      className={cn(
        "flex h-svh w-full flex-col overflow-hidden bg-brand px-6 pb-10 pt-16 sm:px-10",
        className
      )}
    >
      {children}
    </div>
  )
}
