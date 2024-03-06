import * as p5 from "p5";
import { GridTile } from "./grid";

class StartTile extends GridTile {
  constructor(x: number, y: number, image: p5.Image) {
    super(x, y, image, false);
  }
}

class WallTile extends GridTile {
  constructor(x: number, y: number, image: p5.Image) {
    super(x, y, image, true);
  }
}

class PathTile extends GridTile {
  constructor(x: number, y: number, image: p5.Image) {
    super(x, y, image, false);
  }
}

export { StartTile, WallTile, PathTile };
