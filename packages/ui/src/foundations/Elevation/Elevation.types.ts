import type { ViewStyle } from 'react-native'

/**
 * Semantic depth of a native surface.
 *
 * - `flat`: in-page content with no separation shadow.
 * - `raised`: a surface that sits above page background, such as a card or tile.
 * - `overlay`: a surface that temporarily covers content, such as a sheet or menu.
 */
export type ElevationLevel = 'flat' | 'raised' | 'overlay'

/** Native style properties a semantic elevation level is allowed to set. */
export type ElevationStyle = Pick<
  ViewStyle,
  'elevation' | 'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius'
>
