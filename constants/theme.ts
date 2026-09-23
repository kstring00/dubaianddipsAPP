import { Platform, TextStyle } from 'react-native';

/**
 * Dubai & Dips design system.
 *
 * Colors, typography roles, spacing and radii all derive from the official
 * "Dubai & Dips Branding & Guidelines" document. Screens should compose these
 * tokens instead of declaring raw values.
 */

export const colors = {
  // Official palette — Brand Colours, section 2.1.
  courtyard: '#475842',
  naturalChoice: '#E3D3D0',
  bark: '#493C35',
  brownedSugar: '#C2835F',
  offWhite: '#E6DBC6',
  mintCondition: '#D1E3D2',

  // Semantic roles built on the official palette.
  canvas: '#E6DBC6', // app background (Off-White)
  surface: '#F3ECDD', // raised paper surface
  card: '#FBF8F1', // brightest card / ticket face
  ink: '#493C35', // primary text (Bark)
  inkSoft: '#6E5F55', // secondary text
  inkFaint: '#8E8177', // tertiary text / footnotes
  green: '#475842', // primary action (Courtyard)
  greenDeep: '#37452F', // pressed / dark green edge
  greenEdge: '#5A6B55', // border on green surfaces
  blush: '#E3D3D0', // Natural Choice surface
  blushEdge: '#D2BEBA',
  sugar: '#C2835F', // Browned Sugar accent
  sugarSoft: '#D6A383',
  mint: '#D1E3D2',
  white: '#FFFFFF',
  line: '#D8CCBB', // hairlines on light surfaces
  lineSoft: '#E3DACA',

  // Text on Courtyard-green surfaces.
  onGreen: '#E6DBC6',
  onGreenSoft: 'rgba(230,219,198,0.72)',
  onGreenFaint: 'rgba(230,219,198,0.52)',
  onGreenLine: 'rgba(230,219,198,0.24)',

  // Product artwork support tones.
  chocolate: '#4F3023',
  pistachio: '#93A27F',
} as const;

/**
 * Typography roles from the brand guide, mapped to native fallbacks until the
 * licensed font files (Neue Regrade, GothamSS Narrow, IvyMode, Editor's Note)
 * are added to the project.
 */
export const fonts = {
  /** Neue Regrade — titles & body. */
  body: Platform.select({ ios: 'Avenir Next', default: 'sans-serif' })!,
  /** GothamSS Narrow — subheadings, condensed UI type. */
  narrow: Platform.select({
    ios: 'AvenirNextCondensed-Medium',
    default: 'sans-serif-condensed',
  })!,
  narrowBold: Platform.select({
    ios: 'AvenirNextCondensed-DemiBold',
    default: 'sans-serif-condensed',
  })!,
  /** IvyMode — display serif used in the logo and editorial titles. */
  display: Platform.select({ ios: 'Didot', default: 'serif' })!,
  /** Editor's Note — expressive editorial accents. */
  editorial: Platform.select({ ios: 'Georgia', default: 'serif' })!,
  /** Ticket data — flight numbers, gates, barcode captions. */
  mono: Platform.select({ ios: 'Menlo', default: 'monospace' })!,
} as const;

/**
 * Semantic text presets. Use via <AppText variant="…"> or spread into styles.
 */
export const type = {
  hero: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: 0.2,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 27,
    lineHeight: 32,
    letterSpacing: 0.2,
  },
  heading: {
    fontFamily: fonts.body,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 17,
  },
  footnote: {
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 16,
  },
  eyebrow: {
    fontFamily: fonts.narrowBold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  micro: {
    fontFamily: fonts.narrowBold,
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  ticketLabel: {
    fontFamily: fonts.mono,
    fontSize: 8,
    lineHeight: 11,
    letterSpacing: 1.1,
  },
  ticketValue: {
    fontFamily: fonts.mono,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
  },
  destination: {
    fontFamily: fonts.narrowBold,
    fontSize: 26,
    lineHeight: 29,
    letterSpacing: 1.2,
  },
  editorial: {
    fontFamily: fonts.editorial,
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 21,
  },
} satisfies Record<string, TextStyle>;

export type TypeVariant = keyof typeof type;

/** 4pt-based spacing scale. */
export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  x3l: 32,
  x4l: 44,
  x5l: 60,
} as const;

/** Standard horizontal screen gutter. */
export const gutter = space.xl;

export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const shadow = {
  /** Soft resting elevation for cards and tickets. */
  card: {
    shadowColor: colors.bark,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  /** Stronger elevation for the flagship membership card. */
  raised: {
    shadowColor: colors.bark,
    shadowOpacity: 0.18,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
} as const;

/** Duration tokens for the restrained animation language. */
export const motion = {
  fast: 160,
  base: 260,
  slow: 420,
} as const;
