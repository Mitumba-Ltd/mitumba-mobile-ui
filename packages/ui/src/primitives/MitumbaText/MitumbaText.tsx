import { StyleSheet, Text, type TextStyle } from 'react-native'

import { mobileTheme, resolveLineHeight } from '../../theme'
import type {
  MitumbaTextProps,
  MitumbaTextTone,
  MitumbaTextVariant,
  MitumbaTextWeight,
} from './MitumbaText.types'

const variantStyles = StyleSheet.create<Record<MitumbaTextVariant, TextStyle>>({
  caption: {
    fontSize: mobileTheme.typography.fontSizes.sm,
    lineHeight: resolveLineHeight(
      mobileTheme.typography.fontSizes.sm,
      mobileTheme.typography.lineHeightMultipliers.snug,
    ),
  },
  body: {
    fontSize: mobileTheme.typography.fontSizes.base,
    lineHeight: resolveLineHeight(
      mobileTheme.typography.fontSizes.base,
      mobileTheme.typography.lineHeightMultipliers.normal,
    ),
  },
  label: {
    fontSize: mobileTheme.typography.fontSizes.base,
    lineHeight: resolveLineHeight(
      mobileTheme.typography.fontSizes.base,
      mobileTheme.typography.lineHeightMultipliers.snug,
    ),
  },
  title: {
    fontSize: mobileTheme.typography.fontSizes.xl,
    lineHeight: resolveLineHeight(
      mobileTheme.typography.fontSizes.xl,
      mobileTheme.typography.lineHeightMultipliers.snug,
    ),
  },
  heading: {
    fontSize: mobileTheme.typography.fontSizes.xxxl,
    lineHeight: resolveLineHeight(
      mobileTheme.typography.fontSizes.xxxl,
      mobileTheme.typography.lineHeightMultipliers.tight,
    ),
  },
  display: {
    fontSize: mobileTheme.typography.fontSizes.display,
    lineHeight: resolveLineHeight(
      mobileTheme.typography.fontSizes.display,
      mobileTheme.typography.lineHeightMultipliers.tight,
    ),
  },
})

const toneStyles = StyleSheet.create<Record<MitumbaTextTone, TextStyle>>({
  primary: { color: mobileTheme.semanticColors.text.primary },
  secondary: { color: mobileTheme.semanticColors.text.secondary },
  brand: { color: mobileTheme.semanticColors.text.brand },
  earth: { color: mobileTheme.semanticColors.text.earth },
  inverse: { color: mobileTheme.semanticColors.text.inverse },
  success: { color: mobileTheme.semanticColors.text.success },
  warning: { color: mobileTheme.semanticColors.text.warning },
  error: { color: mobileTheme.semanticColors.text.error },
  info: { color: mobileTheme.semanticColors.text.info },
})

const weightStyles = StyleSheet.create<Record<MitumbaTextWeight, TextStyle>>({
  regular: { fontWeight: mobileTheme.typography.fontWeights.regular },
  medium: { fontWeight: mobileTheme.typography.fontWeights.medium },
  semibold: { fontWeight: mobileTheme.typography.fontWeights.semibold },
  bold: { fontWeight: mobileTheme.typography.fontWeights.bold },
  extrabold: { fontWeight: mobileTheme.typography.fontWeights.extrabold },
})

export function MitumbaText({
  variant = 'body',
  tone = 'primary',
  weight = 'regular',
  style,
  ...textProps
}: MitumbaTextProps) {
  return (
    <Text
      {...textProps}
      allowFontScaling
      style={[variantStyles[variant], toneStyles[tone], weightStyles[weight], style]}
    />
  )
}
