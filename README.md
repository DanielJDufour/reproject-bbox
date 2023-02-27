# reproject-bbox
> Reproject a Bounding Box

# install
```bash
npm install reproject-bbox
```

# basic usage
```javascript

import reprojectBoundingBox from "reproject-bbox";

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
## density
You can increase the accuracy of your reprojected bounding box by increasing the point density.
Density is the number of points that you would like to add to each side of the bounding box.
If you pass in an array of two numbers, you can control how many points to add along the x and y-axis.
```js
import reprojectBoundingBox from "reproject-bbox";

const bbox = [ -2316545, -1971615, 1015455, 1512385 ];
reprojectBoundingBox({
  bbox,
  density: 100, // add 100 points to each side of the box before reprojecting
  from: 6623,
  to: 4326
});

reprojectBoundingBox({
  bbox,

  // add 11 points along the x-axis (11 to top side and 11 to bottom side)
  // and 99 points along the y-axis (99 to left side and 99 to right side)
  density: [11, 99], 

  from: 6623,
  to: 4326
});
```

## proj4-fully-loaded dependency
This library depends on [proj4-fully-loaded](https://github.com/DanielJDufour/proj4-fully-loaded).
If proj4-fully-loaded isn't found (perhaps because you used [null-loader](https://v4.webpack.js.org/loaders/null-loader/), then reproject-bbox will attempt to look for a valid proj4 at window.proj4.

## pluggable
If you don't need any dependencies and would prefer to pass in a reprojection function, you can do so:
```js
import reprojectBoundingBox from "reproject-bbox/pluggable.js";

const bbox = reprojectBoundingBox({
  bbox: [ -122.51, 40.97, -122.34, 41.11 ],
  reproject: proj4("EPSG:4326", "EPSG:3857").forward,
});

// bbox is [-13637750.817083945, 5007917.677222896, -13618826.503649088, 5028580.202823918]
```


