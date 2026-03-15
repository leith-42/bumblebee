import Level from "./level.js";
import Hive from "./hive.js";
import Bee from "./bee.js";

const Game = {
    running: false,
    paused: false,
    keyMap: { 37: false, 38: false, 39: false, 40: false },
    backgroundMusic: null,

    init: () => {
        Level.current = 1;
        Game.lives = 5;
        Game.score = 0;
        Game.reset = false;
        Game.lightningEffect = false;
        Game.rainSound = null;
        Game.fadeRainSound = false;
        Game.thunderSound = null;
        Game.fadeThunderSound = false;
        Game.birdCount = 0;
        $("#score").html(Game.score);
        $("#lives").html(Game.startingLives);
        Level.init();
        Hive.init();
        Bee.init();

        Game.backgroundMusic = new Audio("../src/audio/flight_of_the_bumblebee_2.mp3");
        Game.backgroundMusic.loop = true;
    },

    start: () => {
        Game.running = true;
        Game.paused = false;
        Game.toggleBackgroundMusic()
        if (Bee.dead) {
            Bee.init();
        }
    },

    pause: () => {
        Game.paused = true;
        Game.stop();

    },

    stop: () => {
        Game.running = false;
        Game.toggleBackgroundMusic();
    },

    end: () => {
        Game.stop();
        Game.clear();
        Game.reset = true;
        Game.stopBackgroundMusic();
    },

    clear: () => {
        $(".bird").each(function () {
            $(this).remove();
        });

        $(".flower").each(function () {
            $(this).remove();
        });
    },

    complete: () => {
        Game.score += Game.lives * 100000;
        $(".final_score").html(Game.score);
        $("#mission_complete").show("slow");
        $("#start").html("New Game");
        Game.end();
    },

    over: () => {
        $(".final_score").html(Game.score);
        $("#game_over").show("slow");
        $("#start").html("New Game");
        Game.end();
    },

    toggleBackgroundMusic: () => {
        if (Game.backgroundMusic.paused) {
            Game.backgroundMusic.play();
        } else {
            Game.backgroundMusic.pause();
        }
    },

    stopBackgroundMusic: () => {
        Game.backgroundMusic.pause();
        Game.backgroundMusic.currentTime = 0; // Reset to the beginning
    },
};

export default Game;
