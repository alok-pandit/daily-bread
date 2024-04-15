import { w } from 'windstitch'

import { clmx } from '@/utils'

const textInputCls = clmx(
  `box-border w-[99%] m-auto bg-white dark:bg-yellow-100`,
  `shadow-black inline-flex h-[35px]`,
  `items-center justify-center`,
  `rounded-[4px] px-[10px] text-[15px] leading-none`,
  `dark:text-black text-black shadow-[0_0_0_1px]`,
  `outline-none hover:shadow-[0_0_0_1px_black]`,
  `focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-black`
)

export const TextInput = w.input(textInputCls)
