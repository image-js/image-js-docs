`erode` method applies [erosion](https://en.wikipedia.org/wiki/Erosion 'wikipedia link on erosion') on the mask.
It works like this:

```ts
let mask = new Mask(4, 4);
mask.fill(1);
// now mask is filled with 1s
```

:::info
Mask calls a preexisting `erode` function. To know how the function works more in-depth click on [this link](../Morphology/Erode.md)
:::
