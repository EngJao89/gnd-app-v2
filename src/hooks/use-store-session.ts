"use client"

import { isAxiosError } from "axios"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import { useRouter } from "@/i18n/navigation"
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

function handleInvalidStoreSession(
  router: ReturnType<typeof useRouter>,
  messages: { expired: string; onlyStores: string }
) {
  const wasStore = getAuthRole() === "store"

  if (wasStore) {
    clearAuthSession()
    toast.error(messages.expired)
    router.replace("/stores/sign-in")
    return
  }

  toast.error(messages.onlyStores)
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
  const t = useTranslations("StoreSession")
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function validate() {
      if (!isAuthenticated()) {
        toast.error(t("signInRequired"))
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
          handleInvalidStoreSession(router, {
            expired: t("expired"),
            onlyStores: t("onlyStores"),
          })
          return
        }

        toast.error(t("verifyError"))
        router.replace("/products")
      }
    }

    validate()

    return () => {
      isMounted = false
    }
  }, [router, t])

  return isAuthorized
}
