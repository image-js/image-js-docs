// import { Image, waterShed, filterPoints, getExtrema } from 'image-js';

// export default function watershed(image: Image) {
//   image = image.grey().blur({ width: 5, height: 5 });
//   let mask = image.threshold({ algorithm: 'yen' });
//   let roiMap = waterShed(image, {
//     mask,
//     points: filterPoints(
//       image,
//       getExtrema(image, { kind: 'minimum', algorithm: 'square' }),
//       { kind: 'minimum', removeClosePoints: 15 },
//     ),
//   }).getRois({ kind: 'black' });
//   image = image.convertColor('RGB');
//   for (let roi of roiMap) {
//     let mask = roi.getMask();
//     image = image.paintMask(mask, {
//       color: [
//         Math.floor(Math.random() * 255),
//         Math.floor(Math.random() * 255),
//         Math.floor(Math.random() * 255),
//       ],
//       origin: { column: roi.origin.column, row: roi.origin.row },
//     });
//   }
//   return image;
// }
