import { ReactNode } from 'react'
import { w } from 'windstitch'

import { Div1, Div2 } from '@/components/ui-primitives/button/styles'
import useDarkMode from '@/hooks/dark-mode'
import { clmx } from '@/utils'

export const textGradient = clmx(
  'bg-gradient-to-r from-black dark:from-gray-300 to-gray-500',
  'dark:to-gray-400 bg-clip-text text-transparent'
)

export const FunkyBackground = (props: { children: ReactNode }) => {
  const { isDark } = useDarkMode()

  return isDark ? (
    <Div1>
      <Div2 />
      {props.children}
    </Div1>
  ) : (
    <>{props.children}</>
  )
}

const loginBoxCls = clmx(
  'flex flex-col items-center justify-between',
  'p-4 rounded-lg h-96 sm:min-w-2/3 lg:w-2/3',
  'tinted-glass shadow-yellow-400 shadow-md'
)

export const LoginBox = w.div(loginBoxCls)

const bgCls = clmx(
  'flex min-h-screen flex-col',
  'items-center justify-center',
  'p-24 bg-[url("/images/light_bg.jpg")] dark:bg-[url("/images/dark_bg.jpg")]',
  'bg-cover bg-no-repeat bg-center'
)

export const BgMain = w.main(bgCls)
