"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { useMemo, useState } from "react"

import { AppScreenShell } from "@/components/app-screen-shell"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { products } from "@/data/products"
import {
  appBackLinkClassName,
  appOutlineButtonClassName,
  appSearchInputClassName,
} from "@/lib/app-styles"

export function ProductListScreen() {
  const [search, setSearch] = useState("")
  const [quantities, setQuantities] = useState<Record<string, number>>({
    "shapes-chicken": 1,
  })

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return products
    }

    return products.filter((product) =>
      product.name.toLowerCase().includes(query)
    )
  }, [search])

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
      location="Belmore, Sydney"
      showAddProduct
      showCartIcon
      showLogout
      showCartBadge={cartItemCount > 0}
    >
      <div className="flex flex-1 flex-col px-6 pb-10 pt-6">
        <Field>
          <FieldLabel htmlFor="search-products" className="sr-only">
            Search products
          </FieldLabel>
          <div className="relative">
            <Input
              id="search-products"
              type="search"
              placeholder="Search products"
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
          Scan with barcode
        </Button>

        <div className="mt-4 flex-1">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] ?? 0}
              onQuantityChange={(quantity) =>
                handleQuantityChange(product.id, quantity)
              }
            />
          ))}
        </div>

        <Button asChild variant="link" className={`mt-6 ${appBackLinkClassName}`}>
          <Link href="/">Back</Link>
        </Button>
      </div>
    </AppScreenShell>
  )
}
