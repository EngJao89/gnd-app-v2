"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, Mail, MapPin, User } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import { useRequireStoreSession } from "@/hooks/use-store-session"
import { AppScreenShell } from "@/components/app-screen-shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getApiErrorMessage } from "@/lib/api-error"
import { appBackLinkClassName, appOutlineButtonClassName } from "@/lib/app-styles"
import type { Store } from "@/types/store"
import { signOut } from "@/services/auth"
import { getStoreMe } from "@/services/store-auth"

function formatAddress(store: Store) {
  const streetLine = [store.street, store.numberOrBlock]
    .filter(Boolean)
    .join(", ")
  const cityLine = [store.neighborhood, store.city, store.state]
    .filter(Boolean)
    .join(" · ")
  const zipLine = store.zipCode ? `CEP ${store.zipCode}` : null

  return [streetLine, cityLine, zipLine].filter(Boolean)
}

export function StoreProfileScreen() {
  const router = useRouter()
  const isAuthorized = useRequireStoreSession()
  const [store, setStore] = useState<Store | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthorized) {
      return
    }

    let isMounted = true

    async function loadStoreProfile() {
      setIsLoading(true)

      try {
        const data = await getStoreMe()

        if (isMounted) {
          setStore(data)
        }
      } catch (error) {
        if (isMounted) {
          toast.error(
            getApiErrorMessage(error, "Failed to load store profile.")
          )
          router.replace("/stores/sign-in")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadStoreProfile()

    return () => {
      isMounted = false
    }
  }, [isAuthorized, router])

  function handleLogout() {
    signOut()
    toast.success("Logged out successfully!")
    router.push("/")
  }

  if (!isAuthorized) {
    return null
  }

  if (isLoading || !store) {
    return (
      <AppScreenShell showAddProduct showStoreProfile showLogout>
        <div className="flex flex-1 flex-col gap-4 px-6 pb-10 pt-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </AppScreenShell>
    )
  }

  const addressLines = formatAddress(store)

  return (
    <AppScreenShell showAddProduct showStoreProfile showLogout>
      <div className="flex flex-1 flex-col px-6 pb-10 pt-6">
        <h1 className="text-xl font-bold text-foreground">Store profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Account details for your store.
        </p>

        <Card className="mt-6 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="size-5 text-brand" aria-hidden />
              {store.name}
            </CardTitle>
            <CardDescription>{store.legalName}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                CNPJ
              </p>
              <p className="mt-1 text-sm text-foreground">{store.cnpj}</p>
            </div>

            <div>
              <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <User className="size-3.5" aria-hidden />
                Owner
              </p>
              <p className="mt-1 text-sm text-foreground">{store.ownerName}</p>
            </div>

            {store.email ? (
              <div>
                <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Mail className="size-3.5" aria-hidden />
                  Email
                </p>
                <p className="mt-1 text-sm text-foreground">{store.email}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="mt-4 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="size-4 text-brand" aria-hidden />
              Address
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-1">
            {addressLines.map((line) => (
              <p key={line} className="text-sm text-muted-foreground">
                {line}
              </p>
            ))}
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col gap-3">
          <Button asChild className={appOutlineButtonClassName}>
            <Link href="/products/new">Add product</Link>
          </Button>

          <Button asChild className={appOutlineButtonClassName}>
            <Link href="/products">View products</Link>
          </Button>

          <Button
            type="button"
            variant="destructive"
            className="h-11"
            onClick={handleLogout}
          >
            Log out
          </Button>

          <Button asChild variant="link" className={appBackLinkClassName}>
            <Link href="/products">Back</Link>
          </Button>
        </div>
      </div>
    </AppScreenShell>
  )
}
