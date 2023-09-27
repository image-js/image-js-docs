[Check options and parameters of dilate method](https://image-js.github.io/image-js-typescript/classes/Mask.html#dilate 'github.io link')

`dilate` method applies [dilation](https://en.wikipedia.org/wiki/Dilation 'wikipedia link on dilation') on the mask.
It works like this:

```ts
let mask = new Mask(4, 4);
mask = mask.dilate();
```

### Parameters and default values

- [`image`](https://image-js.github.io/image-js-typescript/classes/Mask.html#and 'github.io link')

- [`options`](https://image-js.github.io/image-js-typescript/classes/Mask.html#and 'github.io link')

:::info
Mask calls a preexisting `dilate` function. To learn more about how the function works click on [this link](../Morphology/Dilate.md)
:::
