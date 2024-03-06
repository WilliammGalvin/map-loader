import * as p5 from "p5";
import Grid, { GridTile } from "./models/grid";
import { WallTile, PathTile, StartTile } from "./models/tiles";

const imgUrl =
  "https://raw.githubusercontent.com/WilliammGalvin/puzzle-game/main/assets";

enum AssetCategory {
  TILES = "tiles",
  ITEMS = "items",
  PLAYER = "player",
}

type TileImage = {
  id: string;
  image: p5.Image;
};

type AssetKey = {
  id: string;
  type: string;
};

type AssetEntry = {
  name: string;
  category: AssetCategory;
  image: string;
  entryClass: new (x: number, y: number, image: p5.Image) => any;
};

const assetEntries: AssetEntry[] = [
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

const loadImages = async (p: p5): Promise<TileImage[]> => {
  const loadImage = async (assetEntry: AssetEntry): Promise<TileImage> => {
    return new Promise((resolve) => {
      p.loadImage(
        `${imgUrl}/${assetEntry.category}/${assetEntry.image}`,
        (img) => {
          resolve({ id: assetEntry.name, image: img });
        }
      );
    });
  };

  const imagePromises = assetEntries.map((entry) => loadImage(entry));
  return await Promise.all(imagePromises);
};

const loadMap = async (p: p5, mapName: string) => {
  const mapData = await (await fetch(`${imgUrl}/maps/${mapName}.txt`)).text();
  const assetKey = await getAssetKey(mapName, AssetCategory.TILES);
  const images = await loadImages(p);

  let gridTiles: GridTile[][] = [];

  const loadLine = (rawTiles: string[], y: number): GridTile[] => {
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
      tiles.push(tile);
    }

    return tiles;
  };

  let y = 0;
  for (const line of mapData.split("\n")) {
    gridTiles.push(loadLine(line.split(","), y++ * 50));
  }

  return new Grid(gridTiles);
};

export { AssetCategory, loadMap };
