import { AccessibilityInfo } from 'react-native'

type ReducedMotionListener = () => void

interface ReducedMotionSubscriber {
  listener: ReducedMotionListener
}

export interface ReducedMotionStore {
  getServerSnapshot: () => boolean
  getSnapshot: () => boolean
  subscribe: (listener: ReducedMotionListener) => () => void
}

const SAFE_FALLBACK = true

const subscribers = new Set<ReducedMotionSubscriber>()

let nativeSubscription: ReturnType<typeof AccessibilityInfo.addEventListener> | undefined
let observationGeneration = 0
let snapshot = SAFE_FALLBACK

const getSnapshot = (): boolean => snapshot
const getSafeFallback = (): boolean => SAFE_FALLBACK

const normalize = (reduceMotionEnabled: boolean): boolean =>
  typeof reduceMotionEnabled === 'boolean' ? reduceMotionEnabled : SAFE_FALLBACK

const updateSnapshot = (nextSnapshot: boolean): void => {
  if (snapshot === nextSnapshot) {
    return
  }

  snapshot = nextSnapshot

  for (const subscriber of [...subscribers]) {
    subscriber.listener()
  }
}

const isCurrentObservation = (generation: number): boolean =>
  observationGeneration === generation && subscribers.size > 0

const startObserving = (): void => {
  const generation = ++observationGeneration
  let eventRevision = 0

  const handlePreferenceChange = (reduceMotionEnabled: boolean): void => {
    if (!isCurrentObservation(generation)) {
      return
    }

    eventRevision += 1
    updateSnapshot(normalize(reduceMotionEnabled))
  }

  nativeSubscription = undefined

  try {
    nativeSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      handlePreferenceChange,
    )
  } catch {
    updateSnapshot(SAFE_FALLBACK)
    return
  }

  const queryRevision = eventRevision
  let preferenceQuery: Promise<boolean>

  try {
    preferenceQuery = Promise.resolve(AccessibilityInfo.isReduceMotionEnabled())
  } catch {
    if (isCurrentObservation(generation) && eventRevision === queryRevision) {
      updateSnapshot(SAFE_FALLBACK)
    }
    return
  }

  void preferenceQuery.then(
    (reduceMotionEnabled) => {
      if (isCurrentObservation(generation) && eventRevision === queryRevision) {
        updateSnapshot(normalize(reduceMotionEnabled))
      }
    },
    () => {
      if (isCurrentObservation(generation) && eventRevision === queryRevision) {
        updateSnapshot(SAFE_FALLBACK)
      }
    },
  )
}

const stopObserving = (): void => {
  observationGeneration += 1

  const subscription = nativeSubscription
  nativeSubscription = undefined

  try {
    subscription?.remove?.()
  } catch {
    // The stale handler is generation-guarded if a platform cleanup fails.
  }

  snapshot = SAFE_FALLBACK
}

const subscribe = (listener: ReducedMotionListener): (() => void) => {
  const subscriber = { listener }
  let subscribed = true

  subscribers.add(subscriber)

  if (subscribers.size === 1) {
    startObserving()
  }

  return () => {
    if (!subscribed) {
      return
    }

    subscribed = false
    subscribers.delete(subscriber)

    if (subscribers.size === 0) {
      stopObserving()
    }
  }
}

const subscribeToStaticSnapshot: ReducedMotionStore['subscribe'] = () => () => undefined
const getReducedMotionSnapshot = (): boolean => true
const getMotionEnabledSnapshot = (): boolean => false

export const systemReducedMotionStore = {
  getServerSnapshot: getSafeFallback,
  getSnapshot,
  subscribe,
} satisfies ReducedMotionStore

export const reducedMotionOverrideStore = {
  getServerSnapshot: getReducedMotionSnapshot,
  getSnapshot: getReducedMotionSnapshot,
  subscribe: subscribeToStaticSnapshot,
} satisfies ReducedMotionStore

export const motionEnabledOverrideStore = {
  getServerSnapshot: getMotionEnabledSnapshot,
  getSnapshot: getMotionEnabledSnapshot,
  subscribe: subscribeToStaticSnapshot,
} satisfies ReducedMotionStore
