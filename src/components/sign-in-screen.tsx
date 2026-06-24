"use client"

import Link from "next/link"

import { AuthScreenShell } from "@/components/auth-screen-shell"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  authActionButtonClassName,
  authBackLinkClassName,
  authCheckboxClassName,
  authInputClassName,
  authLabelClassName,
} from "@/lib/auth-styles"

export function SignInScreen() {
  return (
    <AuthScreenShell>
      <div className="flex justify-center">
        <BrandLogo size="compact" />
      </div>

      <form
        className="mt-10 flex flex-1 flex-col"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className={authLabelClassName}>
              Phone number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+61"
              className={authInputClassName}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className={authLabelClassName}>
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className={authInputClassName}
            />
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="remember-me"
              className={`${authLabelClassName} font-normal`}
            >
              Remember me
            </label>
            <Checkbox
              id="remember-me"
              name="rememberMe"
              className={authCheckboxClassName}
            />
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-4 pt-8">
          <Button type="submit" className={authActionButtonClassName}>
            Log in
          </Button>

          <Button asChild variant="link" className={authBackLinkClassName}>
            <Link href="/">Back</Link>
          </Button>
        </div>
      </form>
    </AuthScreenShell>
  )
}
