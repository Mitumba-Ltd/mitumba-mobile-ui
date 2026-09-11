import type { PressableProps } from 'react-native'

export type MitumbaButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type MitumbaButtonSize = 'small' | 'medium' | 'large'

type ControlledPressableProps =
  | 'accessibilityRole'
  | 'accessibilityState'
  | 'aria-busy'
  | 'aria-disabled'
  | 'aria-label'
  | 'children'
  | 'disabled'
  | 'role'

export interface MitumbaButtonProps extends Omit<PressableProps, ControlledPressableProps> {
  /** Visible action label and default accessible name. */
  children: string
  /** Semantic visual treatment. */
  variant?: MitumbaButtonVariant
  /** Touch-target and padding scale. */
  size?: MitumbaButtonSize
  /** Prevents interaction and replaces the visible label with progress feedback. */
  loading?: boolean
  /** Prevents interaction. */
  disabled?: boolean
  /** Stretches the button to the width of its parent. */
  fullWidth?: boolean
}
