import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import { mobileTheme } from '../../theme'
import { MitumbaText, type MitumbaTextTone } from '../MitumbaText'
import type {
  MitumbaButtonProps,
  MitumbaButtonSize,
  MitumbaButtonVariant,
} from './MitumbaButton.types'

const actionColors = mobileTheme.semanticColors.actions

const containerVariants = StyleSheet.create<Record<MitumbaButtonVariant, ViewStyle>>({
  primary: {
    backgroundColor: actionColors.primary.background,
    borderColor: actionColors.primary.border,
  },
  secondary: {
    backgroundColor: actionColors.secondary.background,
    borderColor: actionColors.secondary.border,
  },
  ghost: {
    backgroundColor: actionColors.ghost.background,
    borderColor: actionColors.ghost.border,
  },
  danger: {
    backgroundColor: actionColors.danger.background,
    borderColor: actionColors.danger.border,
  },
})

const sizeVariants = StyleSheet.create<Record<MitumbaButtonSize, ViewStyle>>({
  small: {
    paddingHorizontal: mobileTheme.spacing.base,
    paddingVertical: mobileTheme.spacing.md,
  },
  medium: {
    paddingHorizontal: mobileTheme.spacing.lg,
    paddingVertical: mobileTheme.spacing.base,
  },
  large: {
    paddingHorizontal: mobileTheme.spacing.xxl,
    paddingVertical: mobileTheme.spacing.lg,
  },
})

const minimumSizeVariants = StyleSheet.create<Record<MitumbaButtonSize, ViewStyle>>({
  small: {
    minHeight: mobileTheme.interaction.minimumTouchTarget,
    minWidth: mobileTheme.interaction.minimumTouchTarget,
  },
  medium: {
    minHeight: 48,
    minWidth: 48,
  },
  large: {
    minHeight: 56,
    minWidth: 56,
  },
})

const textTones: Record<MitumbaButtonVariant, MitumbaTextTone> = {
  primary: 'inverse',
  secondary: 'brand',
  ghost: 'brand',
  danger: 'inverse',
}

const indicatorColors: Record<MitumbaButtonVariant, string> = {
  primary: actionColors.primary.foreground,
  secondary: actionColors.secondary.foreground,
  ghost: actionColors.ghost.foreground,
  danger: actionColors.danger.foreground,
}

const resolveConsumerStyle = (
  style: MitumbaButtonProps['style'],
  state: PressableStateCallbackType,
): StyleProp<ViewStyle> => (typeof style === 'function' ? style(state) : style)

export function MitumbaButton({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  disabled = false,
  accessibilityLabel,
  style,
  ...pressableProps
}: MitumbaButtonProps) {
  const isDisabled = disabled || loading

  return (
    <Pressable
      {...pressableProps}
      accessibilityLabel={accessibilityLabel ?? children}
      accessibilityRole="button"
      accessibilityState={{
        busy: loading,
        disabled: isDisabled,
      }}
      disabled={isDisabled}
      style={(state) => [
        resolveConsumerStyle(style, state),
        styles.base,
        containerVariants[variant],
        sizeVariants[size],
        state.pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        minimumSizeVariants[size],
        fullWidth && styles.fullWidth,
      ]}
    >
      <MitumbaText
        accessibilityElementsHidden={loading}
        importantForAccessibility={loading ? 'no-hide-descendants' : 'auto'}
        style={loading && styles.hiddenLabel}
        tone={textTones[variant]}
        variant="label"
        weight="bold"
      >
        {children}
      </MitumbaText>
      {loading ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          pointerEvents="none"
          style={styles.loadingIndicator}
        >
          <ActivityIndicator color={indicatorColors[variant]} />
        </View>
      ) : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: mobileTheme.radius.full,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: mobileTheme.interaction.pressedOpacity,
  },
  disabled: {
    opacity: mobileTheme.interaction.disabledOpacity,
  },
  hiddenLabel: {
    opacity: 0,
  },
  loadingIndicator: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
