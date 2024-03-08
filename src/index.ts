import * as p5 from "p5";
import { loadMap } from "./game/map_loader";
import Game from "./game/game";

export const sketch = (p: p5) => {
  let game: Game;

  p.preload = async () => {
    let mapData = await loadMap(p, "map1");
    game = new Game(mapData.grid, mapData.player);

    await game.preload(p);
  };

  p.setup = () => {
    p.createCanvas(Game.gameSize, Game.gameSize);
  };

  p.draw = () => {
    p.background(220);
    game.drawGame(p);
  };

  p.keyPressed = () => {
    game.movePlayer(p);
  };
};

export const myp5 = new p5(sketch, document.body);
