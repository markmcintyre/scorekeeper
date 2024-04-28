import * as stylex from '@stylexjs/stylex';

const DARK = '@media (prefers-color-scheme: dark)';

export const colors = stylex.defineVars({
  primaryText: {default: 'black', [DARK]: 'white'},
  secondaryText: {default: '#555', [DARK]: '#ccc'},
  accent: {default: 'dodgerblue', [DARK]: 'dodgerblue'},
  background: {default: 'white', [DARK]: 'black'},
  secondaryBackground: {default: '#EEE', [DARK]: '#333'},
});