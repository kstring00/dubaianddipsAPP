import { Platform } from 'react-native';

export const colors = {
  // Official palette from the Dubai & Dips brand guide.
  courtyard: '#475842',
  naturalChoice: '#E3D3D0',
  bark: '#493C35',
  brownedSugar: '#C2835F',
  offWhite: '#E6DBC6',
  mintCondition: '#D1E3D2',

  // Semantic aliases used throughout the app.
  cream: '#E6DBC6',
  creamDeep: '#E3D3D0',
  paper: '#F7F1E7',
  pine: '#475842',
  pineSoft: '#5E6D59',
  pineDark: '#34412F',
  gold: '#C2835F',
  goldSoft: '#D6A383',
  goldPale: '#E9CBB9',
  ink: '#493C35',
  muted: '#75665E',
  white: '#FFFFFF',
  line: '#D6C8BA',
  chocolate: '#493C35',
  pistachio: '#93A27F',
  matcha: '#71846B',
} as const;

export const fonts = {
  // The guide specifies Neue Regrade, GothamSS Narrow, IvyMode and Editor's Note.
  // We use native fallbacks until the licensed brand font files are supplied.
  body: Platform.select({ ios: 'Avenir Next', android: 'sans-serif' })!,
  narrow: Platform.select({ ios: 'AvenirNextCondensed-Medium', android: 'sans-serif-condensed' })!,
  display: Platform.select({ ios: 'Times New Roman', android: 'serif' })!,
  editorial: Platform.select({ ios: 'Georgia', android: 'serif' })!,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
  pill: 999,
} as const;

export const shadow = {
  card: {
    shadowColor: colors.bark,
    shadowOpacity: 0.10,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
};
