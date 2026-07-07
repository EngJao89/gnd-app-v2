"use client"

import Link from "next/link"

import { AppScreenShell } from "@/components/app-screen-shell"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  appBackLinkClassName,
  appInputClassName,
  appSubmitButtonClassName,
} from "@/lib/app-styles"

export function EnterCodeScreen() {
  return (
    <AppScreenShell>
      <form
        className="flex flex-1 flex-col items-center px-6 pb-10 pt-16"
        onSubmit={(event) => event.preventDefault()}
      >
        <p className="text-center text-sm font-bold tracking-wide text-foreground uppercase">
          Enter code below
        </p>

        <FieldGroup className="mt-8 w-full max-w-sm gap-6">
          <Field>
            <FieldLabel htmlFor="code" className="sr-only">
              Code
            </FieldLabel>
            <Input
              id="code"
              name="code"
              autoComplete="off"
              autoCapitalize="characters"
              className={appInputClassName}
            />
          </Field>

          <Button type="submit" className={appSubmitButtonClassName}>
            Submit
          </Button>
        </FieldGroup>

        <Button asChild variant="link" className={`mt-auto ${appBackLinkClassName}`}>
          <Link href="/guest">Back</Link>
        </Button>
      </form>
    </AppScreenShell>
  )
}
