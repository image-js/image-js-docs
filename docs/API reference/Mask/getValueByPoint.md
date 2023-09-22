[Check options and parameters of getValueByPoint method](https://image-js.github.io/image-js-typescript/classes/Mask.html#getValueByPoint 'github.io link')

This method gets value of pixel's specific channel from mask data on a given point.
It works like this:

```ts
let mask = new Mask(3, 3);
let value = mask.getValueByPoint({ column: 1, row: 1 });
// returns an array with a value of the bit (in this case 0).
```

### Parameters and default values

- [`row`](https://image-js.github.io/image-js-typescript/classes/Mask.html#getValue 'github.io link')

- [`column`](https://image-js.github.io/image-js-typescript/classes/Mask.html#getValue 'github.io link')
