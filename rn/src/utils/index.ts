import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const clmx = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const textGradient = clmx(
  'bg-gradient-to-r from-black dark:from-gray-300 to-gray-500',
  'dark:to-gray-400 bg-clip-text text-white'
)
