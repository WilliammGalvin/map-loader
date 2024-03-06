import * as p5 from "p5";

class GridTile {
  private _x: number;
  private _y: number;
  private _image: p5.Image;
  private _isSolid: boolean;

  constructor(x: number, y: number, image: p5.Image, isSolid: boolean) {
    this._x = x;
    this._y = y;
    this._image = image;
    this._isSolid = isSolid;
  }

  public get pos(): { x: number; y: number } {
    return { x: this._x, y: this._y };
  }

  public get image(): p5.Image {
    return this._image;
  }

  public get isSolid(): boolean {
    return this._isSolid;
  }
}

class Grid {
  private _gridTiles: GridTile[][];
  public static tileSize: number = 50;

  constructor(gridTiles: GridTile[][]) {
    this._gridTiles = gridTiles;
  }

  public get gridTiles(): GridTile[][] {
    return this._gridTiles;
  }
}

export default Grid;
export { GridTile };
