'use client'

import { useAtom } from 'jotai'
import { useEffect } from 'react'

import { darkAtom } from '@/atoms'

const useDarkMode = () => {
  const [isDark, setIsDark] = useAtom(darkAtom)
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [setIsDark])

  return { isDark, setIsDark }
}

export default useDarkMode
