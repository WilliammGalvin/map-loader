import { AssetCategory } from "../game/map_loader";

type TileImage = {
  id: string;
  image: p5.Image;
};

type AssetKey = {
  id: string;
  type: string;
};

type AssetOutline = {
  name: string;
  category: AssetCategory;
  image: string;
  entryClass: new (x: number, y: number, image: p5.Image) => any;
};

export type { AssetOutline, AssetKey, TileImage };
