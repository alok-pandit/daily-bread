import { w } from 'windstitch'

import { clmx } from '@/utils'

export const Nav = w.nav(
  clmx(
    'h-16 flex w-full justify-between items-center',
    'p-2 shadow-lg fixed z-10',
    'glass dark:tinted-glass'
  )
)
