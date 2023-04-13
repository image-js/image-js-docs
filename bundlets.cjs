let dts = require('dts-bundle');

dts.bundle({
  name: 'image-js',
  main: 'node_modules/image-js/lib-esm/index.d.ts',
  // We intentionally do not name it with the .d.ts extension
  // To prevent typescript from loading it in a normal environment
  out: `${__dirname}/image-js.dts`,
});
