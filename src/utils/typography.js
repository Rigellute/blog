import Typography from 'typography';
import typographyTheme from 'typography-theme-sutro';
import { theme } from '../styles/theme.js';

const typography = new Typography({
  ...typographyTheme,
  color: theme.colors.background,
});

export const { scale, rhythm, options } = typography;
export default typography;
