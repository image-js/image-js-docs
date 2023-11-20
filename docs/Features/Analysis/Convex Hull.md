[Convex Hull](https://en.wikipedia.org/wiki/Convex_hull 'wikipedia link on convex hull') is a way of characterizing the shape of an image by determining which pixels are adjacent to other pixels of the same intensity. This is a good way to find holes and convex features in an image.

:::tip
To understand what convex hull is, picture a rubber band wrapped around your object. The shape of this rubber band will be the shape of your Convex Hull.
:::

In ImageJS ConvexHull is a ROI class method that returns a `ConvexHull` object. It includes:

- points that form convex hull

- convex hull's surface

- convex hull's perimeter

```ts
let convexHull = roi.convexHull();
```

<details><summary><b>Implementation</b></summary>

Here's how convex hull algorithm is implemented in ImageJS:

_Calculate border points_: ImageJS uses an algorithm to identify points that constitute regions' borders.

_Sorting points lexicographically_: After finding border points, they get sorted in ascending order.

_Build the lower hull_: Traverse the sorted list of points to build the lower hull of the convex hull. Use a stack to keep track of the points in the lower hull. For each point, check whether it forms a left or right turn with the previous two points in the stack. If it forms a right turn, pop the last point from the stack until a left turn is formed. Then push the current point onto the stack.

_Build the upper hull_: Traverse the sorted list of points in reverse order to build the upper hull of the convex hull. Use the same stack as before. Again, ensure that the points in the stack form a convex hull.

_Combine the lower and upper hulls_: The combined result of the lower and upper hulls is the convex hull of the entire set of points.

</details>
