# proj4-bbox
> Functions for Reprojecting Bounding Boxes with Proj4

# install
```bash
npm install proj4-bbox
```

# usage
```javascript

const { reprojectBoundingBox } = require("proj4-bbox");

const ;
const srs = 4326;

const result = reprojectBoundingBox({
  bbox: [ -122.51, 40.97, -122.34, 41.11 ],
  
  // spatial reference system of input bounding box
  from: 4326,
  
  // convert bounding box to this spatial reference system
  to: 3857
});

// result is { bbox: [] }
```
