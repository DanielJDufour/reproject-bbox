# reproject-bbox
> Reproject a Bounding Box

# install
```bash
npm install reproject-bbox
```

# basic usage
```javascript

const reprojectBoundingBox = require("reproject-bbox");

const bbox = reprojectBoundingBox({
  bbox: [ -122.51, 40.97, -122.34, 41.11 ],
  
  // spatial reference system of input bounding box
  from: 4326,
  
  // convert bounding box to this spatial reference system
  to: 3857
});

// bbox is [-13637750.817083945, 5007917.677222896, -13618826.503649088, 5028580.202823918]
```

# advanced usage
This library requires [proj4-fully-loaded](https://github.com/DanielJDufour/proj4-fully-loaded).
If proj4-fully-loaded isn't found (perhaps because you used [null-loader](https://v4.webpack.js.org/loaders/null-loader/), then reproject-bbox will attempt to look for a valid proj4 at window.proj4.
