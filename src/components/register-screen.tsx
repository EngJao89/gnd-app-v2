"use client"

import Link from "next/link"

import { AuthScreenShell } from "@/components/auth-screen-shell"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  authActionButtonClassName,
  authInputClassName,
  authLabelClassName,
} from "@/lib/auth-styles"

export function RegisterScreen() {
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
            <label htmlFor="first-name" className={authLabelClassName}>
              First Name
            </label>
            <Input
              id="first-name"
              name="firstName"
              autoComplete="given-name"
              className={authInputClassName}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="surname" className={authLabelClassName}>
              Surname
            </label>
            <Input
              id="surname"
              name="surname"
              autoComplete="family-name"
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
              autoComplete="new-password"
              className={authInputClassName}
            />
          </div>

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
        </div>

        <div className="mt-auto flex flex-col gap-4 pt-8">
          <Button type="submit" className={authActionButtonClassName}>
            Register
          </Button>

          <Button
            asChild
            variant="link"
            className="text-sm font-normal text-white underline-offset-4 hover:text-white/90"
          >
            <Link href="/">Back</Link>
          </Button>
        </div>
      </form>
    </AuthScreenShell>
  )
}
