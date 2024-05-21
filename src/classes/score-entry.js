import knownGames from '../data/known-games.json';
const GameTest = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;

/**
 * ScoreEntry represents the details of a specific game score.
 */
export default class ScoreEntry {

  /**
   * Constructs a new ScoreEntry from provided string data.
   * @param {*} initialData - One of two types:
   *  - A string representing a game score pasted from a daily online game
   *  - A serialized object from a previously stored ScoreEntry
   */
  constructor(initialData) {

    if (typeof initialData === 'string') {
      this.id = Date.now() + Math.round(Math.random() * 100000000);
      this.game = this.#extractGameName(initialData);
      this.rawData = initialData;
      this.data = this.#sanitize(initialData, knownGames.find((game) => game.name === this.game)?.maxLines);
      this.comment = '';
    } else if (typeof initialData === 'object') {
      const {id, game, rawData, data, comment} = initialData;
      Object.assign(this, {id, game, rawData, data, comment});
    }
    
  }

  /**
   * Extracts the best guess at the name of this game
   * (i.e. the first word without leading spaces or hash symbols)
   * @param {*} data - Game score data
   * @returns A best guess at a game name.
   */
  #extractGameName(data) {
    const [gameName] = data.match(/^[^\d\W\S]*[\w ]*/);
    return gameName.trim() || data;
  }

  /**
   * Sanitizes game score data by removing things like URLs,
   * hash symbols, blank lines, and other lines with game-specific prefixes.
   * @param {*} data - Data representing a sharable game score
   * @param {*} maxLines - A optional maximum number of lines to include
   * @returns 
   */
  #sanitize(data, maxLines) {
    let lines = data.trim().split('\n');

    // Ignore lines past our optional maximum
    if(maxLines) {
      lines = lines.slice(0, maxLines);
    }

    return lines.reduce((finalResult, line) => {

      // Otherwise strip out URLs and Hash symbols
      line = line.replace(/(?:https?):\/\/[\n\S]+/gi, '');
      line = line.replace(/#/g, '');

      // If we still have a non-empty line, append it.
      if (line) {
        finalResult += finalResult ? '\n' + line : line;
      }

      // Otherwise continue
      return finalResult;
    }, '');
  }

  /**
   * Returns whether or not we think this ScoreEntry is actually
   * game data.
   * @returns true if we believe this contains game data, false otherwise.
   */
  isGame() {
    return GameTest.test(this.rawData);
  }

  /**
   * Returns a string representation of this ScoreEntry suitable for sharing.
   * @returns a string
   */
  get sharableData() {
    if (this.comment) {
      let lineCount = this.data.split('\n').length;
      return lineCount > 2 ? `${this.data}\n${this.comment}` : `${this.data} — ${this.comment}`;
    } else {
      return this.data;
    }
  }

};