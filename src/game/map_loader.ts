import * as p5 from "p5";
import Grid, { GridTile } from "../models/grid";
import { WallTile, PathTile, StartTile } from "../models/tiles";
import Player from "../models/player";
import { AssetKey, AssetOutline, TileImage } from "../models/types";

const imgUrl =
  "https://raw.githubusercontent.com/WilliammGalvin/puzzle-game/main/assets";

enum AssetCategory {
  TILES = "tiles",
  ITEMS = "items",
  PLAYER = "player",
}

const assetEntries: AssetOutline[] = [
  {
    name: "start",
    category: AssetCategory.TILES,
    image: "path.png",
    entryClass: StartTile,
  },
  {
    name: "wall",
    category: AssetCategory.TILES,
    image: "wall.png",
    entryClass: WallTile,
  },
  {
    name: "path",
    category: AssetCategory.TILES,
    image: "path.png",
    entryClass: PathTile,
  },
];

const getAssetKey = async (
  mapName: string,
  category: AssetCategory
): Promise<AssetKey[]> => {
  const mapJson = await fetch(`${imgUrl}/maps/${mapName}.json`);

  return await mapJson.json().then((res) => {
    return res[category] as AssetKey[];
  });
};

const loadImage = async (
  p: p5,
  category: string,
  image: string
): Promise<p5.Image> => {
  return new Promise((resolve) => {
    p.loadImage(`${imgUrl}/${category}/${image}`, (img) => {
      resolve(img);
    });
  });
};

const loadMapImages = async (p: p5): Promise<TileImage[]> => {
  const imagePromises: Promise<TileImage>[] = [];

  for (const entry of assetEntries) {
    const promise = loadImage(p, entry.category, entry.image).then((img) => ({
      id: entry.name,
      image: img,
    }));

    imagePromises.push(promise);
  }

  return Promise.all(imagePromises);
};

const loadMap = async (
  p: p5,
  mapName: string
): Promise<{ player: Player; grid: Grid }> => {
  let playerLoc: { x: number; y: number } = { x: 0, y: 0 };

  const loadMapData = async (): Promise<{
    mapData: string;
    assetKey: AssetKey[];
    images: TileImage[];
  }> => {
    const mapDataPromise = fetch(`${imgUrl}/maps/${mapName}.txt`).then((res) =>
      res.text()
    );

    const assetKeyPromise = getAssetKey(mapName, AssetCategory.TILES);
    const imagesPromise = loadMapImages(p);

    return Promise.all([mapDataPromise, assetKeyPromise, imagesPromise]).then(
      (res) => {
        return { mapData: res[0], assetKey: res[1], images: res[2] };
      }
    );
  };

  const loadLine = (
    assetKey: AssetKey[],
    images: TileImage[],
    rawTiles: string[],
    y: number
  ): GridTile[] => {
    const tiles: GridTile[] = [];

    for (let i = 0; i < rawTiles.length; i++) {
      const tileID = rawTiles[i].toLowerCase();

      const key = assetKey.find((k) => k.id === tileID);

      if (!key) {
        console.error(`No key found for tile ID: ${tileID}`);
        continue;
      }

      const assetEntry = assetEntries.find((e) => e.name === key.type);

      if (!assetEntry) {
        console.error(`No asset entry found for tile type: ${key.type}`);
        continue;
      }

      const tileImage = images.find((img) => img.id === assetEntry.name);

      if (!tileImage) {
        console.error(`No image found for tile type: ${assetEntry.name}`);
        continue;
      }

      const tile = new assetEntry.entryClass(i * 50, y, tileImage.image);
      if (tile instanceof StartTile) playerLoc = { x: i * 50, y };

      tiles.push(tile);
    }

    return tiles;
  };

  const loadGrid = (
    mapData: string,
    assetKey: AssetKey[],
    images: TileImage[]
  ): GridTile[][] => {
    let gridTiles: GridTile[][] = [];

    let y = 0;
    for (const line of mapData.split("\n")) {
      gridTiles.push(loadLine(assetKey, images, line.split(","), y++ * 50));
    }

    return gridTiles;
  };

  const { mapData, assetKey, images } = await loadMapData();
  const gridTiles = loadGrid(mapData, assetKey, images);

  return {
    player: new Player(playerLoc.x, playerLoc.y),
    grid: new Grid(gridTiles),
  };
};

export { AssetCategory, loadMap, loadImage };
export type { TileImage };
