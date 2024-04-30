import * as stylex from '@stylexjs/stylex';
import ScoreCard from './ScoreCard';
import {colors} from '../tokens.stylex';

/**
 * ScoreCards is a Component that contains a number of ScoreCards,
 * each displaying a ScoreEntry.
 * @param {*} style - Optional StyleX styles to be applied
 * @param {*} scores - An array of ScoreEntry objects 
 * @returns JSX
 */
export default function ScoreCards({style, scores, onCommentChange, date, onDateChange}) {

  const DateOptions = {
    weekday: 'long',
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  };

  return (
    <div {...stylex.props(style, styles.main)}>
      <h2 {...stylex.props(styles.dateHeader)}>{new Date(date).toLocaleDateString("en-US", DateOptions)}</h2>
      {scores.map((score) => {
        return <ScoreCard key={score.id} score={score} onCommentChange={onCommentChange}/>
      })}
    </div>
  );

};

const styles = stylex.create({
  main: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  dateHeader: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    borderBottom: '1px solid',
    color: colors.secondaryText,
    borderColor: colors.secondaryBackground,
  }
});