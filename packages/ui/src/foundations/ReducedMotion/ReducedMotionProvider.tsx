import { ReducedMotionContext } from './reducedMotionContext'
import type { ReducedMotionProviderProps } from './ReducedMotionProvider.types'

/**
 * Applies a deterministic reduced-motion policy to one React subtree.
 *
 * Omit this provider in production UI that should follow the operating-system
 * preference. Nested providers use the nearest value.
 */
export function ReducedMotionProvider({ children, value }: ReducedMotionProviderProps) {
  return <ReducedMotionContext.Provider value={value}>{children}</ReducedMotionContext.Provider>
}
