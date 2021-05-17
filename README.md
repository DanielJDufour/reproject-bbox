# reproject-bbox
> Reproject a Bounding Box

# install
```bash
npm install reproject-bbox
```

# usage
```javascript

const reprojectBoundingBox = require("reproject-bbox");

const result = reprojectBoundingBox({
  bbox: [ -122.51, 40.97, -122.34, 41.11 ],
  
  // spatial reference system of input bounding box
  from: 4326,
  
  // convert bounding box to this spatial reference system
  to: 3857
});

// result is { bbox: [] }
```
