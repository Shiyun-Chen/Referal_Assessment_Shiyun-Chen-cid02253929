/**
 * @namespace Score
 * @author A. Freddie Page
 * @version 2022.23
 * This module provides the scoring system for a Tetris Game.
 */
const Score = {};

/**
 * The score object contains information about the score of the game.
 * include information such as the number of lines cleared and score.
 * @typedef {object} Score
 * @memberof Score
 */

/**
 * Returns a game state for a new Tetris Game.
 * @function
 * @memberof Score
 * @returns {Score.Score} The new game.
 */
Score.new_score = function () {
    return {
        "score": 0,
        "lines_cleared": 0,
        "last_tetris": false
    };
};

/**
 * Returns the game level according to score.
 * level start from 1 and increase by 1 every 10 lines cleared.
 * @function
 * @memberof Score
 * @param {score} Score.Score An object containing the score.
 * @returns {number} The level.
 */
Score.level = function (score) {
    return Math.floor(score.lines_cleared / 10) + 1;
};

/**
 * Returns a new score object according to number of lines cleared.
 * @function
 * @memberof Score
 * @param {number_of_lines} number_of_lines The number of lines cleared.
 * @param {score} Score.Score An object containing the score.
 * @returns {score} An new score object with the new score and lines cleared.
 */
Score.cleared_lines = function (number_of_lines, score) {
    if (number_of_lines === 1) {
        score.score += 100 * (Score.level(score));
        score.last_tetris = false;
    }
    else if (number_of_lines === 2) {
        score.score += 300 * (Score.level(score));
        score.last_tetris = false;
    }
    else if (number_of_lines === 3) {
        score.score += 500 * (Score.level(score));
        score.last_tetris = false;
    }
    else if (number_of_lines === 4 & !score.last_tetris) {
        score.score += 800 * (Score.level(score));
        score.last_tetris = true;
    }
    else if (number_of_lines === 4 & score.last_tetris) {
        score.score += 1200 * (Score.level(score));
    }
    score.lines_cleared += number_of_lines;
    return score;
};

/**
 * Returns a new score object that adds a given number of points to a given score.
 * @function
 * @memberof Score
 * @param {number} points The number of points to add.
 * @param {score} Score.Score An object containing the score.
 * @returns {score} An new score object with the new score and lines cleared.
 */
Score.add_points = function (points, score) {
    score.score += points;
    return score;
}


export default Object.freeze(Score);
