'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Provider as JotaiProvider, createStore } from 'jotai'

export const store = createStore()

// Create a client
const queryClient = new QueryClient()

const Provider = ({ children }: { children: React.ReactNode }) => (
  <JotaiProvider store={store}>
    <LazyMotion strict features={domAnimation}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </LazyMotion>
  </JotaiProvider>
)

export default Provider
