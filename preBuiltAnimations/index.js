export const fadeIn = [
  ['opacity', {0: 0, 100: 1}, 250]
]
export const fadeOut = [
  ['opacity', {0: 100, 100: 0}, 250]
]
export const zoomIn = [
  ['transform', {0: 0, 80: 1.05, 100: 1}, 320, {valueMap: 'scale($v)'}]
]
export const zoomOut = [
  ['transform', {0: 1, 20: 1.05, 100: 0}, 320, {valueMap: 'scale($v)'}]
]
export const slideUp = [
  ['opacity', {0: 0, 100: 1}, 320, {easing: 'easeOut'}],
  ['transform', {0: 100, 80: -10, 100: 0}, 320, {valueMap: 'translateY($v%)', easing: 'easeOut'}]
]
export const slideDown = [
  ['opacity', {0: 1, 100: 0}, 320, {easing: 'easeIn'}],
  ['transform', {0: 0, 20: -10, 100: 100}, 320, {valueMap: 'translateY($v%)', easing: 'easeIn'}]
]

export const zoomInWithFade = [zoomIn[0], fadeIn[0]];
export const zoomOutWithFade = [zoomOut[0], fadeOut[0]];


//
// export const fadeIn = [{
//     property: 'opacity',
//     schedule: {
//       0: 0,
//       100: 1,
//     },
//     duration: 250,
// }]
// export const fadeOut = [{
//   ...fadeIn[0],
//   schedule: {...fadeIn[0].schedule, 0: 1, 100: 1},
//   from: 1, to: 0
// }]
// export const zoomIn = [{
//   property: 'transform',
//   schedule: {
//     0: 0,
//     80: 1.05,
//     100: 1,
//   },
//   valueMap: 'scale($v)',
//   duration: 320,
// }]
// export const zoomOut = [{
//   ...zoomIn[0],
//   schedule: {0:1, 20: 1.05, 100:0},
// }]
// export const zoomInWithFade = zoomIn.concat(fadeIn);
// export const zoomOutWithFade = zoomOut.concat(fadeOut);
//
// export const slideUp = [{
//   property: 'transform',
//   schedule: {
//     0: 100,
//     85: -6,
//     100: 0,
//   },
//   duration: 320,
//   valueMap: 'translateY($v%)'
// }]
// export const slideDown = [{
//   ...slideUp[0],
//   schedule: {0: 0, 15: -6, 100: 100},
// }]
