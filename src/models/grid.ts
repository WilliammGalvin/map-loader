import TileObject from "./tile_objects";

class GridTitle {
  private _x: number;
  private _y: number;
  private _image: string;
  private _isSolid: boolean;
  private _tileObject: TileObject | null;

  constructor(
    x: number,
    y: number,
    image: string,
    isSolid: boolean,
    tileObject: TileObject | null
  ) {
    this._x = x;
    this._y = y;
    this._image = image;
    this._tileObject = tileObject;
    this._isSolid = isSolid;
  }

  public get pos(): { x: number; y: number } {
    return { x: this._x, y: this._y };
  }

  public get image(): string {
    return this._image;
  }

  public get isSolid(): boolean {
    return this._isSolid;
  }

  public get tileObject(): TileObject | null {
    return this._tileObject;
  }
}

class Grid {
  private _gridTiles: GridTitle[][];
  public static tileSize: number = 50;

  constructor() {
    this._gridTiles = [];
  }

  public get gridTiles(): GridTitle[][] {
    return this._gridTiles;
  }
}

export default Grid;
export { GridTitle };
