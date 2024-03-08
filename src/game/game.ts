import * as p5 from "p5";
import Grid from "../models/grid";
import Player, { PlayerState } from "../models/player";
import { loadImage } from "./map_loader";

class Game {
  private _grid: Grid;
  private _player: Player;

  private _isGameStarted: boolean;
  private _state: PlayerState;
  private _playerImages: { state: PlayerState; image: p5.Image }[];

  public static gameSize = 10 * Grid.tileSize;

  constructor(grid: Grid, player: Player) {
    this._grid = grid;
    this._player = player;
    this._isGameStarted = false;

    this._state = PlayerState.IDLE;
  }

  public async preload(p: p5): Promise<void> {
    const loadPlayerImages = async (): Promise<
      { state: PlayerState; image: p5.Image }[]
    > => {
      let playerImagePromises = [];

      for (const state of Object.values(PlayerState)) {
        playerImagePromises.push({
          state: state,
          image: await loadImage(p, "player", `${state}.png`),
        });
      }

      return Promise.all(playerImagePromises);
    };

    this._playerImages = await loadPlayerImages().then((res) => {
      this._isGameStarted = true;
      return res;
    });
  }

  public drawGame(p: p5): void {
    const drawMap = (grid: Grid) => {
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

    const drawPlayer = (player: Player) => {
      if (!this._isGameStarted) return;

      let playerImage = this._playerImages.find(
        (img) => img.state === this._state
      ).image;

      p.image(
        playerImage,
        player.pos.x,
        player.pos.y,
        Grid.tileSize,
        Grid.tileSize
      );
    };

    drawMap(this._grid);
    drawPlayer(this._player);
  }

  public movePlayer(p: p5): void {
    if (p.keyIsDown(p.UP_ARROW)) {
      this._player.moveY(-Grid.tileSize, this._grid);
      this._state = PlayerState.UP;
    }

    if (p.keyIsDown(p.DOWN_ARROW)) {
      this._player.moveY(Grid.tileSize, this._grid);
      this._state = PlayerState.DOWN;
    }

    if (p.keyIsDown(p.LEFT_ARROW)) {
      this._player.moveX(-Grid.tileSize, this._grid);
      this._state = PlayerState.LEFT;
    }

    if (p.keyIsDown(p.RIGHT_ARROW)) {
      this._player.moveX(Grid.tileSize, this._grid);
      this._state = PlayerState.RIGHT;
    }
  }
}

export default Game;
