import Tetris from "../Tetris.js";
import Score from "../Score.js";
import R from "../ramda.js";

const example_game = Tetris.new_game();
const field_string = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
-S--------
SSS-------
SSSZ-IOOJJ
TSZZ-IOOJJ
TTZL-IOOJJ
TLLL-IOOJJ`;
example_game.field = field_string.split("\n").map(
    (s) => s.replace(/-/g, " ").split("")
);

describe("Score", function () {
    it(
        `A new tetris game
        * Starts on level one
        * With no lines cleared
        * With a score of zero`,
        function () {
            const new_game = Tetris.new_game();
            const score = new_game.score;
            if (Score.level(score) !== 1) {
                throw new Error("New games should start on level one");
            }
            if (score.lines_cleared !== 0) {
                throw new Error("New games should have no lines cleared");
            }
            if (score.score !== 0) {
                throw new Error("New games should have a zero score");
            }
        }
    );

    it(
        `The score tracks the lines that get cleared`,
        function () {
            let game = example_game;
            // Slot an I tetromino into the hole and drop.
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);
            game = Tetris.hard_drop(game);

            if (game.score.lines_cleared !== 4) {
                throw new Error("Expecting 4 lines to clear");
            }
        }
    );

    it(
        `A single line clear scores 100 × level`,
        function () {
            let new_game = Tetris.new_game();
            new_game.field = field_string.split("\n").map(
                (s) => s.replace(/-/g, " ").split(""));
            // Slot a T tetromino into the hole and drop.
            // This can only go one deep.
            new_game.current_tetromino = Tetris.T_tetromino;

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                new_game = Tetris.next_turn(new_game);
            });

            if (new_game.score.score !== 100) {
                throw new Error("A single row cleared should score 100");
            }
        }
    );

    it(
        `A double line clear scores 300 × level`,
        function () {
            // Implement this function.
            let new_game = Tetris.new_game();
            new_game.field = field_string.split("\n").map(
                (s) => s.replace(/-/g, " ").split(""));
            // Slot a J tetromino into the hole and drop.
            // This can only go two deep.
            new_game.current_tetromino = Tetris.J_tetromino;
            new_game = Tetris.rotate_ccw(new_game);

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                new_game = Tetris.next_turn(new_game);
            });

            if (new_game.score.score !== 300) {
                throw new Error("A double row cleared should score 300");
            }
        }
    );

    it(
        `A triple line clear scores 500 × level`,
        function () {
            // Implement this function.
            let new_game = Tetris.new_game();
            // Reset a field
            let new_field_string = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
-S--------
SSSS--IIII
SSSZ-IOOJJ
TSZZ-IOOJJ
TTZL-IOOJJ
TLLL-IOOJJ`;

            new_game.field = new_field_string.split("\n").map(
                (s) => s.replace(/-/g, " ").split(""));

            // Slot a J tetromino into the hole and drop.
            // This can only go three deep.
            new_game.current_tetromino = Tetris.J_tetromino;
            new_game = Tetris.rotate_ccw(new_game);

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                new_game = Tetris.next_turn(new_game);
            });

            if (new_game.score.score !== 500) {
                throw new Error("A triple row cleared should score 500");
            }
        }
    );

    it(
        `A tetris scores 800 × level`,
        function () {
            // Implement this function.
            let new_game = Tetris.new_game();
            new_game.field = field_string.split("\n").map(
                (s) => s.replace(/-/g, " ").split(""));
            // Slot a I tetromino into the hole and drop.
            // This can only go four deep.
            new_game.current_tetromino = Tetris.I_tetromino;
            new_game = Tetris.rotate_ccw(new_game);

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                new_game = Tetris.next_turn(new_game);
            });

            if (new_game.score.score !== 800) {
                throw new Error("A tetris row cleared should score 800");
            }
        }
    );

    it(
        `Back to back tetrises score 1200 × level`,
        function () {
            // Implement this function.
            let new_game = Tetris.new_game();
            new_game.field = field_string.split("\n").map(
                (s) => s.replace(/-/g, " ").split(""));
            // Slot a I tetromino into the hole and drop.
            // This can only go two deep.
            new_game.current_tetromino = Tetris.I_tetromino;
            new_game = Tetris.rotate_ccw(new_game);

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                new_game = Tetris.next_turn(new_game);
            });
            // reset game filed and set I tetromino again
            new_game.field = field_string.split("\n").map(
                (s) => s.replace(/-/g, " ").split(""));

            new_game.current_tetromino = Tetris.I_tetromino;
            new_game = Tetris.rotate_ccw(new_game);

            R.range(0, 22).forEach(function () {
                new_game = Tetris.next_turn(new_game);
            });

            if (new_game.score.score !== 2000) {
                throw new Error("A Back to back tetrises score 1200");
            }
        }
    );

    it(
        `A soft drop score 1 point per cell descended`,
        function () {
            // Implement this function.
            let new_game = Tetris.new_game();
            new_game.field = field_string.split("\n").map(
                (s) => s.replace(/-/g, " ").split(""));
            // Slot a J tetromino into the hole and drop.
            // This can only go two deep.
            new_game.current_tetromino = Tetris.J_tetromino;

            new_game = Tetris.soft_drop(new_game);


            if (new_game.score.score !== 1) {
                throw new Error("A soft drop should score 1");
            }
        }
    );

    it(
        `A hard drop score 2 point per cell descended`,
        function () {
            // Implement this function.
            let new_game = Tetris.new_game();
            new_game.field = field_string.split("\n").map(
                (s) => s.replace(/-/g, " ").split(""));

            new_game.current_tetromino = Tetris.I_tetromino;

            new_game = Tetris.hard_drop(new_game);


            if (new_game.score.score !== 34) {
                throw new Error("A hard drop should score 2 point per cell descended");
            }
        }
    );

    it(
        `Advancing the turn without manually dropping scores nothing.`,
        function () {
            // Implement this function.
            let new_game = Tetris.new_game();
            new_game.field = field_string.split("\n").map(
                (s) => s.replace(/-/g, " ").split(""));
            // Slot a L tetromino into the hole and drop.
            // This can only go two deep.
            new_game.current_tetromino = Tetris.L_tetromino;
            new_game = Tetris.rotate_ccw(new_game);

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                new_game = Tetris.next_turn(new_game);
            });

            if (new_game.score.score !== 0) {
                throw new Error("Advancing the turn without manually dropping should score 0");
            }
        }
    );
});
