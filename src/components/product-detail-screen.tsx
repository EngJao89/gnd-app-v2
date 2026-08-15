"use client"

import Image from "next/image"
import { ImageIcon, Minus, Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import { AppScreenShell } from "@/components/app-screen-shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "@/i18n/navigation"
import { getApiErrorMessage } from "@/lib/api-error"
import { getProductImageUrl } from "@/lib/api-url"
import {
  appBackLinkClassName,
  appOutlineButtonClassName,
} from "@/lib/app-styles"
import type { Product } from "@/types/product"
import { getProductById } from "@/services/products"

function formatPrice(price: number) {
  return price % 1 === 0 ? `$${price}` : `$${price.toFixed(2)}`
}

export function ProductDetailScreen() {
  const t = useTranslations("ProductDetail")
  const tCommon = useTranslations("Common")
  const params = useParams<{ id: string }>()
  const productId = params.id

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasImageError, setHasImageError] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    let isMounted = true

    async function loadProduct() {
      if (!productId) {
        return
      }

      setIsLoading(true)
      setHasImageError(false)

      try {
        const data = await getProductById(productId)

        if (isMounted) {
          setProduct(data)
        }
      } catch (error) {
        if (isMounted) {
          setProduct(null)
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

    loadProduct()

    return () => {
      isMounted = false
    }
  }, [productId, t, tCommon])

  const imageUrl = getProductImageUrl(product?.imageUrl)

  if (isLoading) {
    return (
      <AppScreenShell showCartIcon showLogout>
        <div className="flex flex-1 flex-col gap-4 px-6 pb-10 pt-6">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-24 w-full" />
        </div>
      </AppScreenShell>
    )
  }

  if (!product) {
    return (
      <AppScreenShell showCartIcon showLogout>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-10">
          <p className="text-center text-sm text-muted-foreground">
            {t("notFound")}
          </p>
          <Button asChild variant="link" className={appBackLinkClassName}>
            <Link href="/products">{tCommon("backToProducts")}</Link>
          </Button>
        </div>
      </AppScreenShell>
    )
  }

  return (
    <AppScreenShell showCartIcon showLogout>
      <div className="flex flex-1 flex-col px-6 pb-10 pt-6">
        <Card className="overflow-hidden py-0 shadow-sm">
          <div className="relative aspect-square w-full overflow-hidden bg-muted">
            {imageUrl && !hasImageError ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover"
                onError={() => setHasImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                <ImageIcon className="size-10" aria-hidden />
                <span className="text-sm">{tCommon("noImage")}</span>
              </div>
            )}
          </div>

          <CardHeader>
            <CardTitle className="text-xl leading-snug">{product.name}</CardTitle>
            <CardDescription>
              {[product.brand, product.sector].filter(Boolean).join(" · ") ||
                t("productDetails")}
            </CardDescription>
            <p className="text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {product.description ? (
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  {t("description")}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>
            ) : null}

            {product.store ? (
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  {t("store")}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {product.store.name}
                </p>
                {product.store.city && product.store.state ? (
                  <p className="text-sm text-muted-foreground">
                    {product.store.city}, {product.store.state}
                  </p>
                ) : null}
              </div>
            ) : null}
          </CardContent>

          <CardFooter className="flex flex-col gap-3 border-t bg-background">
            <div className="flex w-full items-center justify-between rounded-lg border border-border px-2 py-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                aria-label={t("decrease", { name: product.name })}
              >
                <Minus className="size-4" />
              </Button>

              <span className="min-w-8 text-center text-base font-medium">
                {quantity}
              </span>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((current) => current + 1)}
                aria-label={t("increase", { name: product.name })}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <Button
              type="button"
              className={appOutlineButtonClassName}
              onClick={() => toast.info(t("addToCartSoon"))}
            >
              {t("addToCart")}
            </Button>
          </CardFooter>
        </Card>

        <Button
          asChild
          variant="link"
          className={`mt-6 ${appBackLinkClassName}`}
        >
          <Link href="/products">{tCommon("back")}</Link>
        </Button>
      </div>
    </AppScreenShell>
  )
}
