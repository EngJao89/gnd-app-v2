"use client"

import { isAxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import {
  clearAuthSession,
  getAuthRole,
  isAuthenticated,
} from "@/lib/auth-session"
import { getStoreMe } from "@/services/store-auth"

async function confirmStoreSession() {
  if (!isAuthenticated()) {
    return false
  }

  try {
    await getStoreMe()
    return true
  } catch {
    return false
  }
}

function handleInvalidStoreSession(router: ReturnType<typeof useRouter>) {
  const wasStore = getAuthRole() === "store"

  if (wasStore) {
    clearAuthSession()
    toast.error("Store session expired. Please sign in again.")
    router.replace("/stores/sign-in")
    return
  }

  toast.error("Only stores can add products.")
  router.replace("/products")
}

export function useIsStoreSession() {
  const [isStore, setIsStore] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function validate() {
      const isValidStore = await confirmStoreSession()

      if (isMounted) {
        setIsStore(isValidStore)
      }
    }

    validate()

    return () => {
      isMounted = false
    }
  }, [])

  return isStore
}

export function useRequireStoreSession() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function validate() {
      if (!isAuthenticated()) {
        toast.error("Please sign in as a store to continue.")
        router.replace("/stores/sign-in")
        return
      }

      try {
        await getStoreMe()

        if (isMounted) {
          setIsAuthorized(true)
        }
      } catch (error) {
        if (
          isAxiosError(error) &&
          (error.response?.status === 401 || error.response?.status === 403)
        ) {
          handleInvalidStoreSession(router)
          return
        }

        toast.error("Could not verify store session. Please try again.")
        router.replace("/products")
      }
    }

    validate()

    return () => {
      isMounted = false
    }
  }, [router])

  return isAuthorized
}
