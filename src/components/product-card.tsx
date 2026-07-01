"use client"

import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Product } from "@/data/products"

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
  return (
    <article className="flex gap-4 border-b border-border py-4 last:border-b-0">
      <div className="flex w-24 shrink-0 flex-col gap-2">
        <div
          className="flex aspect-square items-center justify-center rounded-xl border border-border"
          style={{ backgroundColor: product.imageColor }}
          aria-hidden
        />

        <div className="flex items-center justify-between rounded-md border border-border">
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
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-sm font-semibold leading-snug text-foreground">
            {product.name}
          </h2>
          <span className="shrink-0 text-sm font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>

        <button
          type="button"
          className="mt-2 w-fit text-sm text-muted-foreground underline underline-offset-2"
        >
          Out of stock?
        </button>
      </div>
    </article>
  )
}
