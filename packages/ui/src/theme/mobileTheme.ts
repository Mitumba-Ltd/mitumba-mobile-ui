import { colors, radius, spacing, typography } from '@mitumba/tokens'
import type { TextStyle } from 'react-native'

export type NativeFontWeight = NonNullable<TextStyle['fontWeight']>

const toFontWeight = (weight: number): NativeFontWeight => String(weight) as NativeFontWeight

const toLetterSpacing = (value: string): number => Number.parseFloat(value)

export const resolveLineHeight = (fontSize: number, multiplier: number): number =>
  Math.round(fontSize * multiplier)

export const mobileTheme = {
  colors,
  semanticColors: {
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
      brand: colors.greenDark,
      earth: colors.earthDark,
      inverse: colors.white,
      success: colors.successDark,
      warning: colors.earthDark,
      error: colors.errorDark,
      info: colors.infoDark,
    },
    actions: {
      primary: {
        background: colors.greenDark,
        border: colors.greenDark,
        foreground: colors.white,
      },
      secondary: {
        background: colors.surface,
        border: colors.greenDark,
        foreground: colors.greenDark,
      },
      ghost: {
        background: 'transparent',
        border: 'transparent',
        foreground: colors.greenDark,
      },
      danger: {
        background: colors.errorDark,
        border: colors.errorDark,
        foreground: colors.white,
      },
    },
  },
  spacing,
  radius,
  typography: {
    fontWeights: {
      regular: toFontWeight(typography.fontWeights.regular),
      medium: toFontWeight(typography.fontWeights.medium),
      semibold: toFontWeight(typography.fontWeights.semibold),
      bold: toFontWeight(typography.fontWeights.bold),
      extrabold: toFontWeight(typography.fontWeights.extrabold),
    },
    fontSizes: typography.fontSizes,
    lineHeightMultipliers: typography.lineHeights,
    letterSpacings: {
      tight: toLetterSpacing(typography.letterSpacings.tight),
      normal: toLetterSpacing(typography.letterSpacings.normal),
      wide: toLetterSpacing(typography.letterSpacings.wide),
      wider: toLetterSpacing(typography.letterSpacings.wider),
    },
  },
  interaction: {
    minimumTouchTarget: 44,
    pressedOpacity: 0.82,
    disabledOpacity: 0.5,
  },
} as const

export type MobileTheme = typeof mobileTheme
