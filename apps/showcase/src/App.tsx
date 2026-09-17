import { useState, type ReactNode } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import {
  MitumbaButton,
  MitumbaText,
  ReducedMotionProvider,
  elevation,
  mobileTheme,
  useReducedMotion,
  type ElevationLevel,
} from '@mitumba/mobile-ui'

const elevationDescriptions: Record<ElevationLevel, string> = {
  flat: 'In-page content with no separation shadow.',
  raised: 'Cards and tiles above the page background.',
  overlay: 'Sheets and menus covering content.',
}

interface ShowcaseSectionProps {
  title: string
  children: ReactNode
}

interface ReducedMotionStatusProps {
  description: string
  label: string
}

function ShowcaseSection({ title, children }: ShowcaseSectionProps) {
  return (
    <View style={styles.section}>
      <MitumbaText accessibilityRole="header" variant="title" weight="bold">
        {title}
      </MitumbaText>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  )
}

function ReducedMotionStatus({ description, label }: ReducedMotionStatusProps) {
  const reduceMotion = useReducedMotion()

  return (
    <View style={styles.policyCard}>
      <MitumbaText weight="semibold">{label}</MitumbaText>
      <MitumbaText
        accessibilityLiveRegion="polite"
        tone={reduceMotion ? 'warning' : 'success'}
        weight="bold"
      >
        {reduceMotion ? 'Reduced motion' : 'Motion enabled'}
      </MitumbaText>
      <MitumbaText tone="secondary" variant="caption">
        {description}
      </MitumbaText>
    </View>
  )
}

export function App() {
  const [pressCount, setPressCount] = useState(0)

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView edges={['top', 'right', 'bottom', 'left']} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.hero}>
            <MitumbaText tone="brand" weight="bold">
              NATIVE DESIGN SYSTEM
            </MitumbaText>
            <MitumbaText accessibilityRole="header" variant="display" weight="extrabold">
              Mitumba Mobile UI
            </MitumbaText>
            <MitumbaText tone="secondary">
              A live Expo host for the public package, its interaction states, and its native
              accessibility contract.
            </MitumbaText>
          </View>

          <ShowcaseSection title="Typography">
            <MitumbaText variant="display" weight="extrabold">
              Display
            </MitumbaText>
            <MitumbaText variant="heading" weight="bold">
              Heading
            </MitumbaText>
            <MitumbaText variant="title" weight="semibold">
              Product title
            </MitumbaText>
            <MitumbaText>Comfortable body copy for marketplace information.</MitumbaText>
            <MitumbaText variant="caption" tone="secondary">
              SECONDARY METADATA
            </MitumbaText>
          </ShowcaseSection>

          <ShowcaseSection title="Actions">
            <MitumbaButton fullWidth onPress={() => setPressCount((count) => count + 1)}>
              Primary action
            </MitumbaButton>
            <MitumbaButton fullWidth variant="secondary" onPress={() => undefined}>
              Secondary action
            </MitumbaButton>
            <MitumbaButton fullWidth variant="ghost" onPress={() => undefined}>
              Ghost action
            </MitumbaButton>
            <MitumbaButton fullWidth variant="danger" onPress={() => undefined}>
              Destructive action
            </MitumbaButton>
            <MitumbaButton fullWidth disabled onPress={() => undefined}>
              Disabled action
            </MitumbaButton>
            <MitumbaButton
              accessibilityLabel="Saving look"
              fullWidth
              loading
              onPress={() => undefined}
            >
              Saving look
            </MitumbaButton>
            <MitumbaText tone="secondary">
              Primary action pressed {pressCount} {pressCount === 1 ? 'time' : 'times'}.
            </MitumbaText>
          </ShowcaseSection>

          <ShowcaseSection title="Reduced motion">
            <MitumbaText tone="secondary">
              The live card follows the device. Deterministic cards exercise both public override
              states without a showcase-owned platform listener.
            </MitumbaText>
            <View style={styles.policyGrid}>
              <ReducedMotionStatus
                description="Updates when the operating-system accessibility preference changes."
                label="Live system policy"
              />
              <ReducedMotionProvider value>
                <ReducedMotionStatus
                  description="Static fallback state for reduced-motion component evidence."
                  label="Forced reduced"
                />
              </ReducedMotionProvider>
              <ReducedMotionProvider value={false}>
                <ReducedMotionStatus
                  description="Controlled preview only; never bypass a user preference in production."
                  label="Forced motion enabled"
                />
              </ReducedMotionProvider>
            </View>
          </ShowcaseSection>

          <ShowcaseSection title="Elevation">
            <MitumbaText tone="secondary">
              Semantic depth levels resolved for this platform. Every level keeps a background and
              border so hierarchy survives when the shadow is not rendered.
            </MitumbaText>
            <View style={styles.elevationGrid}>
              {(['flat', 'raised', 'overlay'] as const).map((level) => (
                <View key={level} style={[styles.elevationCard, elevation[level]]}>
                  <MitumbaText weight="semibold">{level}</MitumbaText>
                  <MitumbaText tone="secondary" variant="caption">
                    {elevationDescriptions[level]}
                  </MitumbaText>
                </View>
              ))}
            </View>
          </ShowcaseSection>

          <ShowcaseSection title="Semantic color">
            <View style={styles.colorGrid}>
              <View style={[styles.swatch, styles.brandSwatch]}>
                <MitumbaText tone="inverse" weight="bold">
                  Brand
                </MitumbaText>
              </View>
              <View style={[styles.swatch, styles.earthSwatch]}>
                <MitumbaText tone="inverse" weight="bold">
                  Earth
                </MitumbaText>
              </View>
              <View style={[styles.swatch, styles.infoSwatch]}>
                <MitumbaText tone="inverse" weight="bold">
                  Info
                </MitumbaText>
              </View>
              <View style={[styles.swatch, styles.errorSwatch]}>
                <MitumbaText tone="inverse" weight="bold">
                  Error
                </MitumbaText>
              </View>
            </View>
          </ShowcaseSection>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },
  content: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    padding: mobileTheme.spacing.xxl,
    gap: mobileTheme.spacing.xxxl,
  },
  hero: {
    gap: mobileTheme.spacing.md,
    paddingVertical: mobileTheme.spacing.xxl,
  },
  section: {
    gap: mobileTheme.spacing.lg,
  },
  sectionContent: {
    gap: mobileTheme.spacing.base,
  },
  policyGrid: {
    gap: mobileTheme.spacing.base,
  },
  policyCard: {
    gap: mobileTheme.spacing.sm,
    backgroundColor: mobileTheme.colors.surface,
    borderColor: mobileTheme.semanticColors.actions.secondary.border,
    borderRadius: mobileTheme.radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: mobileTheme.spacing.lg,
  },
  elevationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: mobileTheme.spacing.lg,
  },
  elevationCard: {
    minWidth: 148,
    flexGrow: 1,
    gap: mobileTheme.spacing.sm,
    backgroundColor: mobileTheme.colors.surface,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: mobileTheme.spacing.lg,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: mobileTheme.spacing.base,
  },
  swatch: {
    minWidth: 128,
    minHeight: 96,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: mobileTheme.radius.lg,
    padding: mobileTheme.spacing.lg,
  },
  brandSwatch: {
    backgroundColor: mobileTheme.semanticColors.actions.primary.background,
  },
  earthSwatch: {
    backgroundColor: mobileTheme.semanticColors.text.earth,
  },
  infoSwatch: {
    backgroundColor: mobileTheme.semanticColors.text.info,
  },
  errorSwatch: {
    backgroundColor: mobileTheme.semanticColors.text.error,
  },
})
