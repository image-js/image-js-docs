[Check options and parameters of setPixel method](https://image-js.github.io/image-js-typescript/classes/Mask.html#setValueByPoint 'github.io link')

`setValueByPoint()` method sets the value of a bit via its point.
It works like this:

```ts
let mask = new Mask(3, 3);
let pixel = mask.setValue({ column: 1, row: 1 }, 2);
// sets a pixel in second row and second column with a value (in this case 2).
```

### Parameters and default values

- [`point`](https://image-js.github.io/image-js-typescript/classes/Mask.html#setValueByPoint 'github.io link')

- [`value`](https://image-js.github.io/image-js-typescript/classes/Mask.html#setValueByPoint 'github.io link')
