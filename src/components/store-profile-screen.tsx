"use client"

import { Building2, Mail, MapPin, User } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import { useRequireStoreSession } from "@/hooks/use-store-session"
import { AppScreenShell } from "@/components/app-screen-shell"
import { StoreProductCard } from "@/components/store-product-card"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Link, useRouter } from "@/i18n/navigation"
import { getApiErrorMessage } from "@/lib/api-error"
import { appBackLinkClassName, appOutlineButtonClassName } from "@/lib/app-styles"
import type { Product } from "@/types/product"
import type { Store } from "@/types/store"
import { signOut } from "@/services/auth"
import { getProductsByStoreId } from "@/services/products"
import { getStoreMe } from "@/services/store-auth"

export function StoreProfileScreen() {
  const t = useTranslations("StoreProfile")
  const tCommon = useTranslations("Common")
  const router = useRouter()
  const isAuthorized = useRequireStoreSession()
  const [store, setStore] = useState<Store | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showProducts, setShowProducts] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [hasLoadedProducts, setHasLoadedProducts] = useState(false)

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
            getApiErrorMessage(
              error,
              t("loadError"),
              tCommon("networkError")
            )
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
  }, [isAuthorized, router, t, tCommon])

  async function handleToggleProducts() {
    if (showProducts) {
      setShowProducts(false)
      return
    }

    setShowProducts(true)

    if (hasLoadedProducts || !store) {
      return
    }

    setIsLoadingProducts(true)

    try {
      const data = await getProductsByStoreId(store.id)
      setProducts(data)
      setHasLoadedProducts(true)
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          t("productsLoadError"),
          tCommon("networkError")
        )
      )
      setShowProducts(false)
    } finally {
      setIsLoadingProducts(false)
    }
  }

  function handleLogout() {
    signOut()
    toast.success(t("loggedOut"))
    router.push("/")
  }

  function formatAddress(storeData: Store) {
    const streetLine = [storeData.street, storeData.numberOrBlock]
      .filter(Boolean)
      .join(", ")
    const cityLine = [storeData.neighborhood, storeData.city, storeData.state]
      .filter(Boolean)
      .join(" · ")
    const zipLine = storeData.zipCode
      ? t("cep", { zipCode: storeData.zipCode })
      : null

    return [streetLine, cityLine, zipLine].filter(Boolean)
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
        <h1 className="text-xl font-bold text-foreground">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>

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
                {t("cnpj")}
              </p>
              <p className="mt-1 text-sm text-foreground">{store.cnpj}</p>
            </div>

            <div>
              <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <User className="size-3.5" aria-hidden />
                {t("owner")}
              </p>
              <p className="mt-1 text-sm text-foreground">{store.ownerName}</p>
            </div>

            {store.email ? (
              <div>
                <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Mail className="size-3.5" aria-hidden />
                  {t("email")}
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
              {t("address")}
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
          <Button
            type="button"
            className={appOutlineButtonClassName}
            onClick={handleToggleProducts}
            aria-expanded={showProducts}
          >
            {showProducts ? t("hideProducts") : t("viewProducts")}
          </Button>

          {showProducts ? (
            <div className="flex flex-col gap-3">
              {isLoadingProducts ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-28 w-full rounded-xl" />
                ))
              ) : products.length > 0 ? (
                products.map((product) => (
                  <StoreProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  {t("noProducts")}
                </p>
              )}
            </div>
          ) : null}

          <Button
            type="button"
            variant="destructive"
            className="h-11"
            onClick={handleLogout}
          >
            {t("logOut")}
          </Button>

          <Button asChild variant="link" className={appBackLinkClassName}>
            <Link href="/products">{tCommon("back")}</Link>
          </Button>
        </div>
      </div>
    </AppScreenShell>
  )
}
