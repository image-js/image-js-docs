[Check options and parameters of setValueByPoint method](https://image-js.github.io/image-js-typescript/classes/Mask.html#setValueByPoint 'github.io link')

`setValueByPoint()` method sets the value of a bit via its point coordinates.
It works like this:

```ts
let mask = new Mask(3, 3);
let value = mask.setValueByPoint({ column: 1, row: 1 }, 1);
// sets a bit in second row and second column with a value (in this case 1).
```

### Parameters and default values

- [`point`](https://image-js.github.io/image-js-typescript/classes/Mask.html#setValueByPoint 'github.io link')

- [`value`](https://image-js.github.io/image-js-typescript/classes/Mask.html#setValueByPoint 'github.io link')
