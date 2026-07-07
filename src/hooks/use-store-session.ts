"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import { getAuthRole, isAuthenticated, isStoreSession } from "@/lib/auth-session"

export function useIsStoreSession() {
  const [isStore, setIsStore] = useState(false)

  useEffect(() => {
    setIsStore(isStoreSession())
  }, [])

  return isStore
}

export function useRequireStoreSession() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error("Please sign in as a store to continue.")
      router.replace("/stores/sign-in")
      return
    }

    if (getAuthRole() !== "store") {
      toast.error("Only stores can add products.")
      router.replace("/products")
      return
    }

    setIsAuthorized(true)
  }, [router])

  return isAuthorized
}
