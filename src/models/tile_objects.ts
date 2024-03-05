class TileObject {
  private _image: string;

  constructor(image: string) {
    this._image = image;
  }

  public get image(): string {
    return this._image;
  }
}

export default TileObject;
