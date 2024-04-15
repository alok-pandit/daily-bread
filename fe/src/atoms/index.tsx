import { atom } from 'jotai'
import { atomWithImmer } from 'jotai-immer'

export const darkAtomBase = atomWithImmer(false)

export const darkAtom = atom(
  (get) => get(darkAtomBase),
  (_get, set, isDark: boolean) => {
    if (isDark) {
      document?.documentElement?.classList?.add('dark')
      document?.documentElement?.classList?.remove('light')
    } else {
      document?.documentElement?.classList?.add('light')
      document?.documentElement?.classList?.remove('dark')
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    // document?.documentElement?.classList?.remove('light')
    set(darkAtomBase, isDark)
  }
)
