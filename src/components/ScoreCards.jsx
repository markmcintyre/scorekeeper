import * as stylex from '@stylexjs/stylex';
import ScoreCard from './ScoreCard';

/**
 * ScoreCards is a Component that contains a number of ScoreCards,
 * each displaying a ScoreEntry.
 * @param {*} style - Optional StyleX styles to be applied
 * @param {*} scores - An array of ScoreEntry objects 
 * @returns JSX
 */
export default function ScoreCards({style, scores, onCommentChange}) {

  return (
    <div {...stylex.props(style, styles.main)}>
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
});