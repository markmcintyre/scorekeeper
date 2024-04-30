import * as stylex from '@stylexjs/stylex';
import {colors} from '../tokens.stylex';
import {Paste, Share, Copy} from './Icons';

/**
 * Toolbar is a component representing available user actions
 * for a Scorekeeper app.
 * @param {*} style - Optional StyleX styles
 * @param {*} pasteHandler - A callback function when the user wishes to paste score data.
 * @param {*} shareHandler - A callback function to be invoked when the user wishes to share all scores.
 * @returns JSX
 */
export default function Toolbar({style, pasteHandler, shareHandler, copyHandler}) {
  return (
    <div {...stylex.props(style, styles.main)}>
      <button {...stylex.props(styles.button)} onClick={pasteHandler}>
        <Paste style={styles.icon}/>
        Paste Score
      </button>
      <button {...stylex.props(styles.button)} onClick={copyHandler}>
        <Copy style={styles.icon}/>
        Copy Scores
      </button>
      {shareHandler && <button {...stylex.props(styles.button)} onClick={shareHandler}>
        <Share style={styles.icon}/>
        Share Scores
      </button>}
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'row',
    gap: '.5rem'
  },
  button: {
    fontFamily: 'sans-serif',
    borderColor: colors.accent,
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '.5rem',
    backgroundColor: {default: colors.background, ':hover': colors.accent},
    borderRadius: '.5rem',
    fontSize: '1rem',
    color: {default: colors.accent, ':hover': colors.background},
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
    cursor: 'pointer',
  },
  icon: {
    width: '1rem',
    height: '1rem',
    fill: 'currentColor',
  }
});