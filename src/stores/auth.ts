import { ref } from 'vue'
import type { User } from '@/types'
import { defineStore } from 'pinia'

const authApi = {}

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const selfInfo = ref<User>()

  const setLoggedIn = (value: boolean) => {
    isLoggedIn.value = value
  }

  const getRefreshToken = (): string => localStorage.getItem('refreshToken') ?? ''

  const refreshAuth = async (): Promise<{ isSuccess: boolean }> => {
    const currentRefreshToken = getRefreshToken()

    if (!currentRefreshToken) return { isSuccess: false }

    try {
      const { data } = await authApi.authRefresh(undefined, { refresh_token: currentRefreshToken })

      // TODO: убрать каст как спецификацию по permissions и новой схеме с токенами смержат
      localStorage.setItem(
        'refreshToken',
        (data as unknown as { refresh_token: string }).refresh_token,
      )

      return { isSuccess: true }
    } catch {
      const errorMessage = t
        ? t('rbac.notifications.negative.tokenRefreshError')
        : '[OKAUTH] Refreshing access token error.'
      notifyError(errorMessage)

      resetAuthData()

      return { isSuccess: false }
    }
  }

  const getSelfInfo = async () => {
    try {
      const response = await usersApi.usersGetSelf(undefined, undefined, true)

      selfInfo.value = response.data.item
    } catch (e) {
      const errorMessage = t
        ? t('rbac.notifications.negative.getUserDataError')
        : '[OKAUTH] Fetching self info error.'
      notifyError(errorMessage)
    }
  }

  const init = async () => {
    const { isSuccess } = await refreshAuth()

    if (!isSuccess) return

    await getSelfInfo()

    // вероятнее всего, невозможная ситуация, но опциональный тип диктует необходимость ее обработки
    const isAnySelfInfoExists = !!Object.values(selfInfo.value ?? {}).length
    if (isAnySelfInfoExists) {
      setLoggedIn(true)
    } else {
      const errorMessage = t
        ? t('rbac.notifications.negative.emptySelfInfo')
        : '[OKAUTH] Empty self info fetched.'
      notifyError(errorMessage)
    }
  }

  const resetAuthData = () => {
    localStorage.removeItem('refreshToken')
    setLoggedIn(false)
  }

  const logout = async () => {
    const currentRefreshToken = getRefreshToken()

    try {
      await authApi.authInvalidate(undefined, { refresh_token: currentRefreshToken })
    } catch {
      const errorMessage = t
        ? t('rbac.notifications.negative.failedToInvalidateAuth')
        : '[OKAUTH] Failed to invalidate auth.'
      notifyError(errorMessage)
    } finally {
      resetAuthData()
    }
  }

  return {
    isLoggedIn,
    selfInfo,

    init,
    logout,
    getSelfInfo,
    refreshAuth,
    resetAuthData,
    getRefreshToken,
  }
})
