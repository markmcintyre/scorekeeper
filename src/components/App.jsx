import {useState, useEffect} from 'react';
import * as stylex from '@stylexjs/stylex';
import {colors} from '../tokens.stylex';
import ScoreCards from './ScoreCards';
import {Hundred} from './Icons';
import Toolbar from './Toolbar';
import ScoreEntry from '../classes/score-entry';

/**
 * App is a Rect component representing a Scorekeeper app.
 * @returns - JSX representing a Scorekeeper app.
 */
export default function App() {

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [scores, setScores] = useState([]);

  console.log(date);

  /** 
   * Listen for paste events on the document.
   */
  useEffect(() => {
    document.addEventListener('paste', pasteHandler);
    return () => {
      document.removeEventListener('paste', pasteHandler);
    }
  });

  /**
   * A Paste event handler
   * @param {*} event - A Paste event to be handled
   */
  const pasteHandler = async (event) => {

    const scoreText = await navigator.clipboard.readText();
    const scoreEntry = new ScoreEntry(scoreText);

    /* If the score is likely a game, don't allow pasting
     * anywhere else; otherwise, reject the score but allow
     * pasting.
     */
    if(scoreEntry.isGame()) {
      event.preventDefault();
    } else {
      console.log('No game score detected.');
      return;
    }

    // If we already have this score, return immediately.
    if (scores.find((score) => score.game === scoreEntry.game)) {
      console.log('Already pasted.');
      return;
    }

    // Append our new score
    setScores((prevState) => {
      return [...prevState, scoreEntry]
    });

  };

  /**
   * A Share Event Handler
   */
  const shareHandler = async () => {

    let result = scores.reduce((a, v) => `${a}\n\n${v.sharableData}`, '');

    try {
      await navigator.share({
        title: 'Scorekeeper',
        text: result,
      });
    } catch(e) {
      if(e.name !== 'AbortError') {
        console.error(e);
      }
    }

    console.log('Shared successfully');

  };

  /**
   * A Copy Event Handler
   */
  const copyHandler = async () => {
    let result = scores.reduce((a, v) => `${a}\n\n${v.sharableData}`, '');
    try {
      await navigator.clipboard.writeText(result);
    } catch(e) {
      console.error(e);
    }

    console.log('Copied successfully');
  }

  /**
   * A Comment Change event handler
   * @param {*} scoreId - An ID of a ScoreEntry whose comment has changed
   * @param {*} newComment - A new comment for a ScoreEntry
   */
  const commentChangeHandler = (scoreId, newComment) => {
    setScores(scores.map((score) => {
      if(score.id === scoreId) {
        score.comment = newComment;
      }
      return score;
    }));
  }

  const dateChangeHandler = (newDate) => {
    setDate(newDate);
  }

  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.container)}>
        <header>
          <Hundred style={styles.icon}/>
          <h1 {...stylex.props(styles.title, styles.noPad)}>Scorekeeper</h1>
          <p {...stylex.props(styles.noPad, styles.p)}>Share your daily game scores without the cruft.</p>
        </header>
        <Toolbar
          style={styles.toolbar}
          pasteHandler={pasteHandler}
          shareHandler={navigator.share && scores.length > 0 && shareHandler}
          copyHandler={scores.length > 0 && copyHandler} />
        <ScoreCards scores={scores} onCommentChange={commentChangeHandler} date={date} onDateChange={dateChangeHandler}/>
      </div>
    </div>
  )
}

const styles = stylex.create({
  main: {
    minWidth: '100vw',
    minHeight: '100vh',
    backgroundColor: colors.background,
    color: colors.primaryText,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'sans-serif',
  },
  toolbar: {
    clear: 'both',
  },
  container: {
    width: '100%',
    maxWidth: '800px',
    boxSizing: 'border-box',
    padding: '1rem'
  },
  noPad: {
    margin: 0,
    padding: 0,
  },
  p: {
    color: colors.secondaryText,
  },
  icon: {
    width: '2rem',
    height: '2rem',
    fill: 'red',
    float: 'left',
    margin: '.5rem 1rem 2rem 0',
  },
  title: {
    fontWeight: 900,
  }
});
