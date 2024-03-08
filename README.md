# Map Loader
Map loader dynamically fetches and loads in tiles for a 2D game. A system designed for customizability and flexability.

### How it works
Each map contains two files, a JSON file and a txt file.  The JSON file will contain an asset key of the ID and the corresponding asset name. For example:
```json
{
  "tiles": [
    {
      "id": "0",
      "type": "start"
    },
    {
      "id": "1",
      "type": "path"
    },
    {
      "id": "2",
      "type": "wall"
    }
  ]
}
```

The txt file is the map layout, defined by the ids from the JSON file. For example:
```
2,2,2,2,2,2,1,1,1,1
2,1,1,1,1,1,1,1,1,1
2,1,2,2,2,2,2,2,1,2
2,1,2,2,2,2,2,2,1,2
2,0,1,1,1,2,2,2,1,2
2,2,2,2,1,2,2,2,1,2
2,2,2,2,1,2,2,2,1,2
2,2,2,2,1,2,2,2,1,2
1,1,1,1,1,1,1,1,1,1
1,1,2,2,2,2,2,2,1,1
```

Every tile entry in the JSON file is loaded into the code and paired with its corresponding class. This allows for total customization of what tiles you want in your map and what IDs you want them to be repersented by. The layout file is then parsed and a custom tile instance is created for each ID.

### Example map
![image](https://github.com/WilliammGalvin/map-loader/assets/79233903/375cebe0-43ab-4997-a882-cd9d42d8d3f6)

### Technologies used
- Typescript
- Webpack
- p5.js

### Key concepts
- Modular programming
- Asynchronous programming
- Creative solutions to add flexibility
