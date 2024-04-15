import { w } from 'windstitch'

import { clmx } from '@/utils'

export const Div1 = w.div('relative inline-flex group')

export const Div2 = w.div(
  clmx(
    'absolute',
    'transition-transform duration-2000 opacity-70',
    '-inset-px bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-100',
    'rounded-xl blur-lg',
    'group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-500 ease-in-out',
    'animate-tilt'
  )
)

export const Button1 = w.button(
  clmx(
    'relative inline-flex items-center justify-center',
    'px-8 py-4 overflow-hidden',
    'text-lg font-bold text-white',
    'transition-all duration-200 bg-gray-900',
    'font-pj rounded-xl focus:outline-none',
    'focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
  ),
  {
    variants: {
      long: (yes: boolean) => (yes ? 'w-64' : '')
    },
    defaultVariants: {
      // `long` becomes optional
      long: false
    }
  }
)

export const Span1 = w.span(
  clmx(
    'absolute right-0 w-9 h-32 -mt-12',
    'transition-all duration-1000 transform translate-x-12',
    'bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease'
  )
)
