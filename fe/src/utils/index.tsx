import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const clmx = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
