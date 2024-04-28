import {useState, useEffect} from 'react';
import * as stylex from '@stylexjs/stylex';
import {colors} from '../tokens.stylex';

/**
 * ScoreCard is a component representing a single game's score.
 * @param {*} score - A ScoreEvent whose data is to be displayed
 * @returns JSX
 */
export default function ScoreCard({score, onCommentChange}) {

  const [comment, setComment] = useState('');

  useEffect(() => {
    onCommentChange && onCommentChange(score.id, comment);
  }, [comment]);

  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.scoreData)}>{score.data}</div>
      <input 
        {...stylex.props(styles.input)}
        placeholder="Optional comment"
        autoFocus
        value={comment}
        onChange={(e) => setComment(e.target.value)}></input>
    </div>
  );
};

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    backgroundColor: colors.secondaryBackground,
    color: colors.secondaryText,
    borderRadius: '1rem',
    fontSize: '1.2rem',
    fontFamily: 'sans-serif',
    padding: '1rem',
  },
  input: {
    border: '1px solid silver',
    padding: '.5rem',
    borderRadius: '.5rem',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
  },
  scoreData: {
    whiteSpace: 'pre-wrap',
  }
});