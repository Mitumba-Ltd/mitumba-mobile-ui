import { StyleSheet, View, type ViewStyle } from 'react-native'

import { elevation as elevationPolicy } from '../../foundations'
import { mobileTheme } from '../../theme'
import type { SurfacePadding, SurfaceProps, SurfaceRadius, SurfaceTone } from './Surface.types'

const toneStyles = StyleSheet.create<Record<SurfaceTone, ViewStyle>>({
  default: { backgroundColor: mobileTheme.colors.surface },
  subtle: { backgroundColor: mobileTheme.colors.background },
  strong: { backgroundColor: mobileTheme.colors.greenDark },
})

const borderStyles = StyleSheet.create<Record<SurfaceTone, ViewStyle>>({
  default: {
    borderColor: mobileTheme.colors.border,
    borderWidth: StyleSheet.hairlineWidth,
  },
  subtle: {
    borderColor: mobileTheme.colors.divider,
    borderWidth: StyleSheet.hairlineWidth,
  },
  strong: {
    borderColor: mobileTheme.colors.greenDark,
    borderWidth: StyleSheet.hairlineWidth,
  },
})

const radiusStyles = StyleSheet.create<Record<SurfaceRadius, ViewStyle>>({
  none: { borderRadius: 0 },
  small: { borderRadius: mobileTheme.radius.sm },
  medium: { borderRadius: mobileTheme.radius.lg },
  large: { borderRadius: mobileTheme.radius.xl },
  pill: { borderRadius: mobileTheme.radius.full },
})

const paddingStyles = StyleSheet.create<Record<SurfacePadding, ViewStyle>>({
  none: { padding: 0 },
  compact: { padding: mobileTheme.spacing.base },
  comfortable: { padding: mobileTheme.spacing.lg },
  spacious: { padding: mobileTheme.spacing.xxl },
})

const styles = StyleSheet.create({
  clipped: {
    // Grow and shrink so a constrained surface still fills or contains its
    // content; both are inert when the outer view is sized by that content.
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'hidden',
  },
})

/**
 * Non-interactive native container for semantic background, border, radius,
 * spacing, and approved elevation.
 *
 * Depth never carries meaning alone: spacing and typography establish the
 * hierarchy, so the surface still reads when a platform does not render its
 * shadow.
 *
 * Consumer `style` is applied last on the outermost view. Under `clip` that
 * view is not the children's flex parent, so properties that arrange children
 * or replace the inner padding, border, or radius do not reach them.
 */
export function Surface({
  tone = 'default',
  elevation = 'flat',
  radius = 'medium',
  padding = 'comfortable',
  bordered = false,
  clip = false,
  children,
  style,
  ...viewProps
}: SurfaceProps) {
  const depth = elevationPolicy[elevation]

  if (clip) {
    return (
      <View {...viewProps} style={[toneStyles[tone], radiusStyles[radius], depth, style]}>
        <View
          style={[
            styles.clipped,
            radiusStyles[radius],
            paddingStyles[padding],
            bordered && borderStyles[tone],
          ]}
        >
          {children}
        </View>
      </View>
    )
  }

  return (
    <View
      {...viewProps}
      style={[
        toneStyles[tone],
        radiusStyles[radius],
        paddingStyles[padding],
        bordered && borderStyles[tone],
        depth,
        style,
      ]}
    >
      {children}
    </View>
  )
}
