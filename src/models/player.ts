import Game from "../game/game";
import Grid from "./grid";

enum PlayerState {
  IDLE = "player_idle",
  UP = "player_up",
  DOWN = "player_down",
  LEFT = "player_left",
  RIGHT = "player_right",
}

class Player {
  private _posX: number;
  private _posY: number;
  private _state: PlayerState;

  constructor(x: number, y: number) {
    this._posX = x;
    this._posY = y;
    this._state = PlayerState.IDLE;
  }

  public moveX(val: number, grid: Grid): void {
    const nextX = this._posX + val;
    if (nextX < 0 || nextX >= Game.gameSize) return;
    if (grid.getTileAt(nextX, this._posY).isSolid) return;

    this._posX += val;
  }

  public moveY(val: number, grid: Grid): void {
    const nextY = this._posY + val;
    if (nextY < 0 || nextY >= Game.gameSize) return;
    if (grid.getTileAt(this._posX, nextY).isSolid) return;

    this._posY += val;
  }

  public get pos(): { x: number; y: number } {
    return { x: this._posX, y: this._posY };
  }

  public get state(): PlayerState {
    return this._state;
  }

  public set state(val: PlayerState) {
    this._state = val;
  }
}

export default Player;
export { PlayerState };
