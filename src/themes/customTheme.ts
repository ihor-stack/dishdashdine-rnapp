import {extendTheme} from 'native-base';
import {
  flexVariants,
  pressableVariants,
  textVariants,
} from './customThemeVariants';

export const theme = extendTheme({
  fontConfig: {
    DMSans: {
      400: {
        normal: 'DMSans-Regular',
        italic: 'DMSans-Italic',
      },
      500: {
        normal: 'DMSans-Medium',
        italic: 'DMSans-MediumItalic',
      },
      700: {
        normal: 'DMSans-Bold',
        italic: 'DMSans-BoldItalic',
      },
    },
  },
  fonts: {
    heading: 'DMSans',
    body: 'DMSans',
    mono: 'DMSans',
  },
  components: {
    Text: {variants: textVariants},
    Pressable: {variants: pressableVariants},
    Flex: {variants: flexVariants},
  },
  space: {
    10: 10,
    20: 20,
    50: 50,
  },
});
