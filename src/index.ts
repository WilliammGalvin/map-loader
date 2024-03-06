import * as p5 from "p5";
import { loadMap } from "./map_loader";
import Grid from "./models/grid";

export const sketch = (p: p5) => {
  let grid: Grid;

  p.preload = async () => {
    grid = await loadMap(p, "map1");
  };

  p.setup = () => {
    p.createCanvas(500, 500);
  };

  p.draw = () => {
    p.background(220);

    for (const row of grid.gridTiles) {
      for (const tile of row) {
        p.image(
          tile.image,
          tile.pos.x,
          tile.pos.y,
          Grid.tileSize,
          Grid.tileSize
        );
      }
    }
  };
};

export const myp5 = new p5(sketch, document.body);
