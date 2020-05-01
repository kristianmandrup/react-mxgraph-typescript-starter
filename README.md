# React mxgraph and TypeScript starter app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- React 16.13+
- mxgraph 4.1+
- TypeScript 3.7+ starter app

Uses:

- [ts-mxgraph](https://www.npmjs.com/package/ts-mxgraph)
- [mxgraph](https://www.npmjs.com/package/mxgraph)

## Demo

Install dependencies `yarn install`

Run `yarn start`

<img src="./docs/images/mxgraph-hello-world.png" width="50%"/>

## Using mxgraph

- [mxgraph Tutorial](https://jgraph.github.io/mxgraph/docs/tutorial.html)
- [mxgraph manual](https://jgraph.github.io/mxgraph/docs/manual.html#1.6.1)
- [maxgraph API specification](https://jgraph.github.io/mxgraph/docs/js-api/files/index-txt.html)

### The mxGraph Model and archictecture

Although the transactions to the model are stored on the model, mxGraph is designed in such a way that the main public API is through the mxGraph class.

Though many of the main API calls are through the `mxGraph` class, keep in mind that `mxGraphModel` is the underlying object that stores the data structure of your graph.

`mxGraph` uses a transactional system for making changes to the model.

For each change to the model you make a call to `beginUpdate()`, make the appropriate calls to change the model, then call `endUpdate()` to finalize the changes and have the change event notifications sent out.

Key API Methods:

```js
mxGraphModel.beginUpdate() - starts a new transaction or a sub-transaction.
mxGraphModel.endUpdate() - completes a transaction or a sub-transaction.
mxGraph.addVertex() - Adds a new vertex to the specified parent cell.
mxGraph.addEdge() - Adds a new edge to the specified parent cell.
```  

### Model change methods

list of the methods that alter the graph model and should be placed, directly or indirectly, with the scope of an update:

```js
add(parent, child, index)
remove(cell)
setCollapsed(cell, collapsed)
setGeometry(cell, geometry)
setRoot(root)
setStyle(cell, style)
setTerminal(cell, terminal, isSource)
setTerminals(edge,source,target)
setValue(cell, value)
setVisible(cell, visible)
```

Core API functions:

`mxGraph.insertVertex(parent, id, value, x, y, width, height, style)` – creates and inserts a new vertex into the model, within a begin/end update call.
`mxGraph.insertEdge(parent, id, value, source, target, style)` – creates and inserts a new edge into the model, within a begin/end update call.

The parameters of the function:

`parent` – the cell which is the immediate parent of the new cell in the group structure. We will address the group structure shortly, but for now use `graph.getDefaultParent();` as your default parent, as used in the HelloWorld example.

`id` – this is a global unique identifier that describes the cell, it is always a string. This is primarily for referencing the cells in the persistent output externally. If you do not wish to maintain ids yourself, pass null into this parameter and ensure that `mxGraphModel.isCreateIds()` returns `true`. This way the model will manage the ids and ensure they are unique.

`value` – this is the user object of the cell. User object are simply that, just objects, but form the objects that allow you to associate the business logic of an application with the visual representation of `mxGraph`. They will be described in more detail later in this manual, however, to start with if you use a string as the user object, this will be displayed as the label on the vertex or edge.

`x, y, width, height` – as the names suggest, these are the x and y position of the top left corner of the vertex and its width and height.

`style` – the style description to be applied to this vertex. Styles will be described in more detail shortly, but at a simple level this parameter is a string that follows a particular format. In the string appears zero or more style names and some number of key/value pairs that override the global style or set a new style. Until we create custom styles, we will just use those currently available.

### mxCell

`mxCell` is the cell object for both vertices and edges. `mxCell` duplicates many of the functions available in the model. When creating a new cell, three things are required in the constructor, a `value` (user object), a `geometry` and a `style`.

### Style

The concept of styles and stylesheets in conceptually similar to CSS stylesheets.
Open up the `util.mxConstants.js` file (from `mxgraph` or `mxgraph-js` repos) in your editor and search for the first match on “STYLE_”. If you scroll down you will see a large number of strings defined for all the various styles available with this prefix. Some of styles apply to vertices, some to edges and some to both.

```js
var v1 = graph.insertVertex(parent, null, 'Hello', 20, 20, 80, 30, 'ROUNDED');

// To create a new vertex with the ROUNDED style, overriding the stroke and fill colors:

var v1 = graph.insertVertex(parent, null, 'Hello',  20, 20, 80, 30, 'ROUNDED;strokeColor=red;fillColor=green');
```

Core API functions:

`mxGraph.setCellStyle(style, cells)` – Sets the style for the array of cells, encapsulated in a begin/end update.

`mxGraph.getCellStyle(cell)` – Returns the style for the specified cell, merging the styles from any local style and the default style for that cell type.

To create the `ROUNDED` global style described above, you can follow this template to create a style and register it with `mxStyleSheet`:

```js
var style = new Object();
style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
style[mxConstants.STYLE_OPACITY] = 50;
style[mxConstants.STYLE_FONTCOLOR]= '#774400';
graph.getStylesheet().putCellStyle('ROUNDED',style);
```

### Geometry

The reason for a separate `mxGeometry` class, as opposed to simply having the mxRectangle class store this information, is that the edges also have geometry information.

The `width` and `height` values are ignored for edges and the x and y values relate to the positioning of the edge label. In addition, edges have the concept of control points. These are intermediate points along the edge that the edge is drawn as passing through. The use of control points is sometimes referred to as edge routing.

Core API functions:

`mxGraph.resizeCell(cell, bounds)` – Resizes the specified cell to the specified bounds, within a begin/end update call.
`mxGraph.resizeCells(cells, bounds)` – Resizes each of the cells in the cells array to the corresponding entry in the bounds array, within a begin/end update call.

### User objects

The User object is what gives mxGraph diagrams a context, it stores the business logic associated with a visual cell.

In the simple case, it simply represents the label that will be displayed for that cell. In more complex applications, these user objects will be objects instead. Some attribute of that object will generally be the label that the visual cell will display, the rest of the object describes logic relating to the application domain.

Typically, this workflow will exist on some application server and/or database. The browser user connects to that server, or some front-end server linked to the application server and the user's web application requests the “order” workflow. The server obtains the data of that workflow and transmits it to the client.

mxGraph supports the process of populating the model on the server-side and transmitting to the client, and back again. See the later chapter on “I/O and Server Communication”.

### Grouping

Grouping, within mxGraph, is the concept of logically associating cells with one another. This is commonly referred to as the concept of sub-graphs in many graph toolkits. Grouping involves one or more vertices or edges becoming children of a parent vertex or edge (usually a vertex) in the graph model data structure. 

- Sub-graphs
- Expanding and collapsing
- Layering
- Drill down, step up

Core API functions:

`mxGraph.groupCells(group, border, cells)` – Adds the specified cells to the specified group, within a begin/end update

`mxGraph.ungroupCells(cells)` – Removes the specified cells from their parent and adds them to their parent's parent. Any group empty after the operation are deleted. The operation occurs within a begin/end update.

#### Folding

Folding is the collective term we use for expanding and collapsing groups. We say a cell is folded by making it's child vertices invisible.

Core API function:

`mxGraph.foldCells(collapse, recurse, cells)` – States the collapsed state of the specificed cells, within a begin/end update.

`mxGraph.isCellFoldable(cell, collapse)` – By default true for cells with children.
`mxGraph.isCellCollapsed(cell)` – Returns the folded state of the cell

Core API functions:

`mxGraph.enterGroup(cell)` – Makes the specified cell the new root of the display area.
`mxGraph.exitGroup()` - Makes the parent of the current root cell, if any, the new root cell.
`mxGraph.home()` - Exits all groups, making the default parent the root cell.

### Layering and Filtering

In mxGraph, like many graphical applications, there is the concept of z-order. That is, the order of objects as you look into the screen direction. Objects can be behind or in front of other objects and if they overlap and are opaque then the back-most object will be partially or complete obscured.

Core API function:

`mxGraph.orderCells(back, cells)` – Moves the array of cells to the front or back of their siblings, depending on the flag, within a begin/end update.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
