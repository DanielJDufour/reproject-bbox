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
## well-known text
Because reproject-bbox passes the `from` and `to` parameters to [proj4js](http://proj4js.org/) and proj4js supports
[Well-Known Text](https://en.wikipedia.org/wiki/Well-known_text_representation_of_coordinate_reference_systems),
you can also pass WKT strings and Proj4JS strings in place of EPSG Codes.
```js
import reprojectBoundingBox from "reproject-bbox";

// example WKT and PROJ4 Strings from http://proj4js.org/
reprojectBoundingBox({
  bbox,
  from: 'PROJCS["NAD83 / Massachusetts Mainland",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",42.68333333333333],PARAMETER["standard_parallel_2",41.71666666666667],PARAMETER["latitude_of_origin",41],PARAMETER["central_meridian",-71.5],PARAMETER["false_easting",200000],PARAMETER["false_northing",750000],AUTHORITY["EPSG","26986"],AXIS["X",EAST],AXIS["Y",NORTH]]',
  to: "+proj=gnom +lat_0=90 +lon_0=0 +x_0=6300000 +y_0=6300000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"
});
```

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

## split
reproject-bbox will automatically split bounding boxes where x=0 and y=0 before reprojecting and merging them back together.  This can greatly improve accuracy for certain projections, especially ones around the poles.  However, if you really want to turn it off, you can.
```js
reprojectBoundingBox({
  bbox,
  from: 3857,
  split: false, // turn off automatic splitting
  to: 4326
})
```


## proj4-fully-loaded dependency
This library depends on [proj4-fully-loaded](https://github.com/DanielJDufour/proj4-fully-loaded).
If proj4-fully-loaded isn't found (perhaps because you used [null-loader](https://v4.webpack.js.org/loaders/null-loader/), then reproject-bbox will attempt to look for a valid proj4 at window.proj4.

## lite
If you are looking for a lighter library without as many dependencies, check out [bbox-fns](https://github.com/danieljdufour/bbox-fns).
