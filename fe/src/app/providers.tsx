'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Provider as JotaiProvider, createStore } from 'jotai'
import { ThemeProvider } from 'next-themes'

import useMounted from '@/hooks/mounted'

export const store = createStore()

const queryClient = new QueryClient()

const Provider = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted()

  return (
    mounted && (
      <JotaiProvider store={store}>
        <ThemeProvider
          disableTransitionOnChange
          attribute="class"
          enableSystem
          enableColorScheme={false}
        >
          <LazyMotion strict features={domAnimation}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </LazyMotion>
        </ThemeProvider>
      </JotaiProvider>
    )
  )
}
export default Provider
