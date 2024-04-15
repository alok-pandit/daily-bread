'use client'

import { LazyMotion, domAnimation } from 'framer-motion'
import { Provider as JotaiProvider, createStore } from 'jotai'

export const store = createStore()

const Provider = ({ children }: { children: React.ReactNode }) => (
  <JotaiProvider store={store}>
    <LazyMotion strict features={domAnimation}>
      {children}
    </LazyMotion>
  </JotaiProvider>
)

export default Provider
