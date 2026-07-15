"use client"

import Link from "next/link"
import { ImageIcon, Minus, Plus } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getProductImageUrl } from "@/lib/api-url"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/product"

type ProductCardProps = {
  product: Product
  quantity: number
  onQuantityChange: (quantity: number) => void
}

function formatPrice(price: number) {
  return price % 1 === 0 ? `$${price}` : `$${price.toFixed(2)}`
}

export function ProductCard({
  product,
  quantity,
  onQuantityChange,
}: ProductCardProps) {
  const [hasImageError, setHasImageError] = useState(false)
  const imageUrl = getProductImageUrl(product.imageUrl)

  return (
    <Card className="flex-row gap-0 py-0 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex w-24 shrink-0 flex-col">
        <Link
          href={`/products/${product.id}`}
          className="relative aspect-square overflow-hidden bg-muted"
          aria-label={`View ${product.name}`}
        >
          {imageUrl && !hasImageError ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={() => setHasImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-2 text-center text-muted-foreground">
              <ImageIcon className="size-5" aria-hidden />
              <span className="text-[10px] leading-tight">No image</span>
            </div>
          )}
        </Link>

        <CardFooter className="border-t bg-background p-2">
          <div className="flex w-full items-center justify-between rounded-md border border-border">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="size-7 rounded-none"
              onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
              aria-label={`Decrease ${product.name}`}
            >
              <Minus className="size-3" />
            </Button>

            <span className="min-w-6 text-center text-sm font-medium">
              {quantity}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="size-7 rounded-none"
              onClick={() => onQuantityChange(quantity + 1)}
              aria-label={`Increase ${product.name}`}
            >
              <Plus className="size-3" />
            </Button>
          </div>
        </CardFooter>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-(--card-spacing)">
        <CardHeader className="px-(--card-spacing) pb-0">
          <CardTitle className="line-clamp-3 text-sm leading-snug">
            <Link
              href={`/products/${product.id}`}
              className="hover:underline"
            >
              {product.name}
            </Link>
          </CardTitle>
          <CardAction>
            <span className="text-sm font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
          </CardAction>
        </CardHeader>

        <CardContent className="px-(--card-spacing) pt-2">
          {product.brand || product.sector ? (
            <p className="text-xs text-muted-foreground">
              {[product.brand, product.sector].filter(Boolean).join(" · ")}
            </p>
          ) : null}

          <Button
            type="button"
            variant="link"
            className={cn(
              "h-auto p-0 text-sm text-muted-foreground",
              product.brand || product.sector ? "mt-1" : "mt-0"
            )}
          >
            Out of stock?
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}
