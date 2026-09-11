import type { TextProps } from 'react-native'

export type MitumbaTextVariant = 'caption' | 'body' | 'label' | 'title' | 'heading' | 'display'

export type MitumbaTextTone =
  'primary' | 'secondary' | 'brand' | 'earth' | 'inverse' | 'success' | 'warning' | 'error' | 'info'

export type MitumbaTextWeight = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold'

export interface MitumbaTextProps extends Omit<TextProps, 'allowFontScaling'> {
  /** Semantic visual hierarchy for font size and line height. */
  variant?: MitumbaTextVariant
  /** Accessible default foreground for light surfaces; use inverse only on approved strong surfaces. */
  tone?: MitumbaTextTone
  /** Optional weight override. */
  weight?: MitumbaTextWeight
}
