import { message } from "antd"
import { useState } from "react"

export interface Messages {
  loading: string
  success: string
  error: (detail: string) => string
}

function useLoading<T extends any[]>(callback: (...params: T) => {} | Promise<any>, messages: Messages): [(...params: T) => {}, boolean] {
  const [loading, setLoading] = useState(false)

  return [async (...params: T) => {
    const uid = + new Date()
    setLoading(true)
    message.loading({ content: messages.loading, key: uid, duration: 0 })
    try {
      await callback(...params)
      message.success({ content: messages.success, key: uid })
    } catch (error) {
      message.error({ content: messages.error(typeof error === 'string' ? error : (error as Error).message), key: uid })
    } finally {
      setLoading(false)
    }
  }, loading];
}

export default useLoading;