class Player {
  private _posX: number;
  private _posY: number;

  constructor(x: number, y: number) {
    this._posX = x;
    this._posY = y;
  }

  public get pos(): { x: number; y: number } {
    return { x: this._posX, y: this._posY };
  }

  public addToX(val: number): void {
    this._posX += val;
  }

  public addToY(val: number): void {
    this._posY += val;
  }
}

export default Player;
