"use client"

import Link from "next/link"
import { ImageIcon } from "lucide-react"
import { useState } from "react"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getProductImageUrl } from "@/lib/api-url"
import type { Product } from "@/types/product"

type StoreProductCardProps = {
  product: Product
}

function formatPrice(price: number) {
  return price % 1 === 0 ? `$${price}` : `$${price.toFixed(2)}`
}

export function StoreProductCard({ product }: StoreProductCardProps) {
  const [hasImageError, setHasImageError] = useState(false)
  const imageUrl = getProductImageUrl(product.imageUrl)

  return (
    <Link href={`/products/${product.id}`} className="block">
      <Card className="flex-row gap-0 overflow-hidden py-0 shadow-sm transition-shadow hover:shadow-md">
        <div className="relative w-24 shrink-0 overflow-hidden bg-muted">
          <div className="aspect-square">
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
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between py-(--card-spacing)">
          <CardHeader className="px-(--card-spacing) pb-0">
            <CardTitle className="line-clamp-3 text-sm leading-snug">
              {product.name}
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
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
