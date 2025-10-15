import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Fonts, Gutters, Images, Layout, themes, DefaultVariables } from '../theme';

export default function useTheme() {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === 'dark';
  const currentTheme = 'default';

  let variables = {};
  let partialTheme = {};
  let darkVariables = {};
  let partialDarkTheme = {};

  if (currentTheme !== 'default') {
    const { Variables, ...themeConfig } = themes[currentTheme] || {};
    variables = Variables;
    partialTheme = themeConfig || {};
  }
  if (darkMode) {
    const { Variables, ...darkThemeConfig } = themes[`${currentTheme}_dark`] || {};
    darkVariables = Variables;
    partialDarkTheme = darkThemeConfig;
  }

  const themeVariables = mergeVariables(variables, darkVariables);
  const fonts = Fonts(themeVariables);
  const gutters = Gutters(themeVariables);
  const images = Images(themeVariables);
  const layout = Layout(themeVariables);

  const baseTheme = {
    Fonts: fonts,
    Gutters: gutters,
    Images: images,
    Layout: layout,
    ...themeVariables,
  };

  return buildTheme(
    darkMode,
    baseTheme,
    formatTheme(themeVariables, partialTheme || {}),
    formatTheme(themeVariables, partialDarkTheme || {})
  );
}

const formatTheme = (variables, theme) => {
  return Object.entries(theme).reduce((acc, [name, generate]) => {
    return {
      ...acc,
      [name]: generate(variables),
    };
  }, theme);
};

const mergeVariables = (themeConfig, darkThemeConfig) => {
  return Object.entries(DefaultVariables).reduce((acc, [group, vars]) => {
    const theme = themeConfig[group];
    const darkTheme = darkThemeConfig[group];
    return {
      ...acc,
      [group]: {
        ...vars,
        ...(theme || {}),
        ...(darkTheme || {}),
      },
    };
  }, DefaultVariables);
};

const buildTheme = (darkMode, baseTheme, themeConfig, darkThemeConfig) => {
  return {
    ...mergeTheme(baseTheme, themeConfig, darkThemeConfig),
    darkMode,
    NavigationTheme: mergeNavigationTheme(
      darkMode ? DarkTheme : DefaultTheme,
      baseTheme.NavigationColors
    ),
  };
};

const mergeTheme = (baseTheme, theme, darkTheme) =>
  Object.entries(baseTheme).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        ...(value || {}),
        ...(theme[key] || {}),
        ...(darkTheme[key] || {}),
      },
    }),
    baseTheme
  );

const mergeNavigationTheme = (reactNavigationTheme, overrideColors) => ({
  ...reactNavigationTheme,
  colors: {
    ...reactNavigationTheme.colors,
    ...overrideColors,
  },
});
