import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3B82F6',            // azul claro (Blue-500)
    primaryContainer: '#E0F2FE',   // azul muito claro para containers
    secondary: '#38BDF8',          // Sky-400
    secondaryContainer: '#E0F2FE',
    tertiary: '#64748B',           // Slate-500
    surface: '#FFFFFF',
    surfaceVariant: '#F1F5F9',     // Slate-100
    background: '#F8FAFC',         // Slate-50
    error: '#EF4444',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#0F172A',          // Slate-900
    onBackground: '#0F172A',
    outline: '#E2E8F0',            // Slate-200
  },
  fonts: {
    ...MD3LightTheme.fonts,
    headlineLarge: {
      ...MD3LightTheme.fonts.headlineLarge,
      fontWeight: '700' as const,
    },
    headlineMedium: {
      ...MD3LightTheme.fonts.headlineMedium,
      fontWeight: '600' as const,
    },
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      fontWeight: '600' as const,
    },
  },
};
