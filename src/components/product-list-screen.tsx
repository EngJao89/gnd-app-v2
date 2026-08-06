"use client"

import { Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify"

import { useIsStoreSession } from "@/hooks/use-store-session"
import { AppScreenShell } from "@/components/app-screen-shell"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "@/i18n/navigation"
import { getApiErrorMessage } from "@/lib/api-error"
import {
  appBackLinkClassName,
  appOutlineButtonClassName,
  appSearchInputClassName,
} from "@/lib/app-styles"
import type { Product } from "@/types/product"
import { getProducts } from "@/services/products"

export function ProductListScreen() {
  const t = useTranslations("Products")
  const tCommon = useTranslations("Common")
  const isStore = useIsStoreSession()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  useEffect(() => {
    let isMounted = true

    async function loadProducts() {
      try {
        const data = await getProducts()

        if (isMounted) {
          setProducts(data)
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
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [t, tCommon])

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return products
    }

    return products.filter((product) =>
      product.name.toLowerCase().includes(query)
    )
  }, [products, search])

  const cartItemCount = Object.values(quantities).reduce(
    (total, quantity) => total + quantity,
    0
  )

  function handleQuantityChange(productId: string, quantity: number) {
    setQuantities((current) => ({
      ...current,
      [productId]: quantity,
    }))
  }

  return (
    <AppScreenShell
      location={tCommon("location")}
      showAddProduct={isStore}
      showStoreProfile={isStore}
      showCartIcon
      showLogout
      showCartBadge={cartItemCount > 0}
    >
      <div className="flex flex-1 flex-col px-6 pb-10 pt-6">
        <Field>
          <FieldLabel htmlFor="search-products" className="sr-only">
            {t("search")}
          </FieldLabel>
          <div className="relative">
            <Input
              id="search-products"
              type="search"
              placeholder={t("search")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className={appSearchInputClassName}
            />
            <Search
              className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-brand"
              aria-hidden
            />
          </div>
        </Field>

        <Button type="button" className={`mt-4 ${appOutlineButtonClassName}`}>
          {t("scanBarcode")}
        </Button>

        <div className="mt-4 flex flex-1 flex-col gap-3">
          {isLoading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={quantities[product.id] ?? 0}
                onQuantityChange={(quantity) =>
                  handleQuantityChange(product.id, quantity)
                }
              />
            ))
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {search.trim() ? t("emptySearch") : t("empty")}
            </p>
          )}
        </div>

        <Button asChild variant="link" className={`mt-6 ${appBackLinkClassName}`}>
          <Link href="/">{tCommon("back")}</Link>
        </Button>
      </div>
    </AppScreenShell>
  )
}
