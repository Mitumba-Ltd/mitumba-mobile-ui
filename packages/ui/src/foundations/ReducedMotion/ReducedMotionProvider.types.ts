import type { ReactNode } from 'react'

export interface ReducedMotionProviderProps {
  /** Content that receives the scoped reduced-motion policy. */
  children: ReactNode
  /**
   * Fixed reduced-motion value for descendant `useReducedMotion` calls.
   *
   * `true` may safely enforce less motion. Reserve `false` for deterministic
   * previews and validation; it must not bypass a user's system preference in
   * production.
   */
  value: boolean
}
