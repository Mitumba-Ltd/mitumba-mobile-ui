import { colors } from '@mitumba/tokens'
import { Platform } from 'react-native'

import type { ElevationLevel, ElevationStyle } from './Elevation.types'

const shadowColor = colors.textPrimary

const androidElevation: Record<ElevationLevel, ElevationStyle> = {
  flat: { elevation: 0 },
  raised: { elevation: 2 },
  overlay: { elevation: 8 },
}

const iosElevation: Record<ElevationLevel, ElevationStyle> = {
  flat: {
    shadowColor,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  raised: {
    shadowColor,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  overlay: {
    shadowColor,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
  },
}

/**
 * Static semantic elevation styles for the current platform.
 *
 * Android uses native `elevation`; iOS uses the shadow properties. Depth never
 * carries meaning alone: pair a level with background, border, spacing, or
 * heading semantics so hierarchy survives when shadows are not rendered.
 *
 * A clipping surface must apply the level to an outer view, because
 * `overflow: 'hidden'` removes the iOS shadow of the view that clips.
 */
export const elevation: Record<ElevationLevel, ElevationStyle> = Platform.select({
  android: androidElevation,
  default: iosElevation,
})
