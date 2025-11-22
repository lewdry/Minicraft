import Game from './Game.js';

const canvas = document.getElementById('game');
// scale canvas to 3x for readability
canvas.style.width = `${canvas.width * 3}px`;
canvas.style.height = `${canvas.height * 3}px`;
const game = new Game(canvas);

game.start();

window.game = game;
