import { useContext, useSyncExternalStore } from 'react'

import { ReducedMotionContext } from './reducedMotionContext'
import {
  motionEnabledOverrideStore,
  reducedMotionOverrideStore,
  systemReducedMotionStore,
} from './reducedMotionStore'

/**
 * Returns whether non-essential motion must be reduced for this subtree.
 *
 * Without a `ReducedMotionProvider`, the value follows React Native's system
 * accessibility query and change event. It starts at the conservative `true`
 * fallback and remains `true` when the platform value is unavailable.
 */
export function useReducedMotion(): boolean {
  const override = useContext(ReducedMotionContext)
  const store =
    override === undefined
      ? systemReducedMotionStore
      : override
        ? reducedMotionOverrideStore
        : motionEnabledOverrideStore

  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot)
}
