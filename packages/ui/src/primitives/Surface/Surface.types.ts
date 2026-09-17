import type { ViewProps } from 'react-native'

import type { ElevationLevel } from '../../foundations'

/** Semantic background treatment of a surface. */
export type SurfaceTone = 'default' | 'subtle' | 'strong'

/** Semantic corner rounding. */
export type SurfaceRadius = 'none' | 'small' | 'medium' | 'large' | 'pill'

/** Semantic inner spacing. */
export type SurfacePadding = 'none' | 'compact' | 'comfortable' | 'spacious'

export interface SurfaceProps extends ViewProps {
  /** Semantic background. Pair `strong` with `MitumbaText` tone `inverse`. */
  tone?: SurfaceTone
  /** Semantic depth from the shared elevation policy. */
  elevation?: ElevationLevel
  /** Semantic corner rounding. */
  radius?: SurfaceRadius
  /** Semantic inner spacing. */
  padding?: SurfacePadding
  /**
   * Adds a hairline border in the tone's border colour.
   *
   * This is decoration, not a hierarchy guarantee: the border is about 1.4:1 on
   * `default`, 1.1:1 on `subtle`, and invisible on `strong`, where it matches
   * the background. Let spacing and typography carry the grouping.
   */
  bordered?: boolean
  /**
   * Clips children to the rounded shape.
   *
   * This renders an inner clipping view so the surface keeps its iOS shadow,
   * which `overflow: 'hidden'` would otherwise remove.
   */
  clip?: boolean
}
