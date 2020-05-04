# Layouts

## Hierarchical

[mxHierarchicalLayout](https://jgraph.github.io/mxgraph/docs/js-api/files/layout/hierarchical/mxHierarchicalLayout-js.html)

Use to create pyramid-like relationships, such as an organisational diagram

```ts
const layout = new mxHierarchicalLayout(graph);
layout.execute(graph.getDefaultParent());
```

## Swimlane

[mxSwimlaneLayout](https://jgraph.github.io/mxgraph/docs/js-api/files/layout/hierarchical/mxSwimlaneLayout-js.html)

```ts
const layout = new mxSwimlaneLayout(graph);
layout.execute(graph.getDefaultParent());
```

## Circular

[mxCircleLayout](https://jgraph.github.io/mxgraph/docs/js-api/files/layout/mxCircleLayout-js.html)

Layout nodes in a circle

```ts
const layout = new mxCircleLayout(graph);
layout.execute(graph.getDefaultParent());
```

## Organic

```ts
var layout = new mxFastOrganicLayout(graph);
layout.execute(graph.getDefaultParent());
```

## Tree layout

Suitable for graphs that have no cycles (trees)

Compact:

```ts
const layout = new mxCompactTreeLayout(graph);
layout.execute(graph.getDefaultParent());
```

Radial:

```ts
var layout = new mxRadialTreeLayout(graph);
layout.execute(graph.getDefaultParent());
```