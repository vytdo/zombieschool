import Game from "./src/game/Game.js";

window.onload = () => {
  const canvas = document.getElementById("gameCanvas");
  const game = new Game(canvas);
  game.start();
};
