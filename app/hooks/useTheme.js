import {
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

const blueThemeColors = {
  "primary": "rgb(0, 91, 193)",
  "onPrimary": "rgb(255, 255, 255)",
  "primaryContainer": "rgb(216, 226, 255)",
  "onPrimaryContainer": "rgb(0, 26, 65)",
  "secondary": "rgb(86, 94, 113)",
  "onSecondary": "rgb(255, 255, 255)",
  "secondaryContainer": "rgb(219, 226, 249)",
  "onSecondaryContainer": "rgb(20, 27, 44)",
  "tertiary": "rgb(113, 85, 115)",
  "onTertiary": "rgb(255, 255, 255)",
  "tertiaryContainer": "rgb(251, 215, 252)",
  "onTertiaryContainer": "rgb(41, 19, 45)",
  "error": "rgb(186, 26, 26)",
  "onError": "rgb(255, 255, 255)",
  "errorContainer": "rgb(255, 218, 214)",
  "onErrorContainer": "rgb(65, 0, 2)",
  "background": "rgb(254, 251, 255)",
  "onBackground": "rgb(27, 27, 31)",
  "surface": "rgb(254, 251, 255)",
  "onSurface": "rgb(27, 27, 31)",
  "surfaceVariant": "rgb(225, 226, 236)",
  "onSurfaceVariant": "rgb(68, 71, 79)",
  "outline": "rgb(116, 119, 127)",
  "outlineVariant": "rgb(196, 198, 208)",
  "shadow": "rgb(0, 0, 0)",
  "scrim": "rgb(0, 0, 0)",
  "inverseSurface": "rgb(48, 48, 51)",
  "inverseOnSurface": "rgb(242, 240, 244)",
  "inversePrimary": "rgb(173, 198, 255)",
  "elevation": {
    "level0": "transparent",
    "level1": "rgb(241, 243, 252)",
    "level2": "rgb(234, 238, 250)",
    "level3": "rgb(226, 233, 248)",
    "level4": "rgb(224, 232, 248)",
    "level5": "rgb(218, 229, 246)"
  },
  "surfaceDisabled": "rgba(27, 27, 31, 0.12)",
  "onSurfaceDisabled": "rgba(27, 27, 31, 0.38)",
  "backdrop": "rgba(46, 48, 56, 0.4)"
};

export function useTheme() {

  const theme = {
    ...DefaultTheme,
    colors: blueThemeColors,
  };

  return theme;
}
