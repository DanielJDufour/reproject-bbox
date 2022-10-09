export default function reprojectBoundingBox({
  bbox,
  from,
  proj4: _proj4,
  to
}: {
  bbox: [number, number, number, number] | Readonly<[number, number, number, number]>,
  from: number | string,
  proj4?: any,
  to: number | string
}): [number, number, number, number];

