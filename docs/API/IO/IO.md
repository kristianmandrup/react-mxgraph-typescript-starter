# IO

- [IO](#io)
  - [mxCellCodec](#mxcellcodec)
  - [mxChildChangeCodec](#mxchildchangecodec)
  - [mxCodec](#mxcodec)
  - [mxCodecRegistry](#mxcodecregistry)
  - [mxDefaultKeyHandlerCodec](#mxdefaultkeyhandlercodec)
  - [mxDefaultPopupMenuCodec](#mxdefaultpopupmenucodec)
  - [mxDefaultToolbarCodec](#mxdefaulttoolbarcodec)
  - [mxEditorCodec](#mxeditorcodec)
  - [mxGenericChangeCodec](#mxgenericchangecodec)
  - [mxGraphCodec](#mxgraphcodec)
  - [mxGraphViewCodec](#mxgraphviewcodec)
  - [mxModelCodec](#mxmodelcodec)
  - [mxObjectCodec](#mxobjectcodec)
  - [mxRootChangeCodec](#mxrootchangecodec)
  - [mxStylesheetCodec](#mxstylesheetcodec)
  - [mxTerminalChangeCodec](#mxterminalchangecodec)

## mxCellCodec

Codec for `mxCells`.  This class is created and registered dynamically at load time and used implicitely via `mxCodec` and the `mxCodecRegistry`.

Transient Fields

- `children`
- `edges`
- `overlays`
- `mxTransient`

Reference Fields

- `parent`
- `source`
- `target`

Transient fields can be added using the following code

```js
mxCodecRegistry.getCodec(mxCell).exclude.push(‘name_of_field’);
```

To subclass `mxCell`, replace the template and add an alias as follows.

```js
function CustomCell(value, geometry, style)
{
  mxCell.apply(this, arguments);
}

mxUtils.extend(CustomCell, mxCell);

mxCodecRegistry.getCodec(mxCell).template = new CustomCell();
mxCodecRegistry.addAlias('CustomCell', 'mxCell');
```

## mxChildChangeCodec

Codec for `mxChildChanges`.  This class is created and registered dynamically at load time and used implicitely via `mxCodec` and the `mxCodecRegistry`.

Transient Fields

- `model`
- `previous`
- `previousIndex`
- `child`

Reference Fields

- `parent`

## mxCodec

XML codec for JavaScript object graphs. See `mxObjectCodec` for a description of the general encoding/decoding scheme.  This class uses the codecs registered in `mxCodecRegistry` for encoding/decoding each object.

References

In order to resolve references, especially forward references, the mxCodec constructor must be given the document that contains the referenced elements.

Examples

The following code is used to encode a graph model.

```js
var encoder = new mxCodec();
var result = encoder.encode(graph.getModel());
var xml = mxUtils.getXml(result);
```

Example

Using the code below, an XML document is decoded into an existing model.  The document may be obtained using one of the functions in mxUtils for loading an XML file, eg. `mxUtils.get`, or using `mxUtils`.`parseXml` for parsing an XML string.

```js
var doc = mxUtils.parseXml(xmlString);
var codec = new mxCodec(doc);
codec.decode(doc.documentElement, graph.getModel());
```

Example

This example demonstrates parsing a list of isolated cells into an existing graph model.  Note that the cells do not have a parent reference so they can be added anywhere in the cell hierarchy after parsing.

```js
var xml = '<root><mxCell id="2" value="Hello," vertex="1"><mxGeometry x="20" y="20" width="80" height="30" as="geometry"/></mxCell><mxCell id="3" value="World!" vertex="1"><mxGeometry x="200" y="150" width="80" height="30" as="geometry"/></mxCell><mxCell id="4" value="" edge="1" source="2" target="3"><mxGeometry relative="1" as="geometry"/></mxCell></root>';
var doc = mxUtils.parseXml(xml);
var codec = new mxCodec(doc);
var elt = doc.documentElement.firstChild;
var cells = [];

while (elt != null)
{
  cells.push(codec.decode(elt));
  elt = elt.nextSibling;
}

graph.addCells(cells);
```

Example

Using the following code, the selection cells of a graph are encoded and the output is displayed in a dialog box.

```js
var enc = new mxCodec();
var cells = graph.getSelectionCells();
mxUtils.alert(mxUtils.getPrettyXml(enc.encode(cells)));
```

Newlines in the XML can be converted to `<br>`, in which case a `<br>` argument must be passed to `mxUtils.getXml` as the second argument.

Debugging

For debugging I/O you can use the following code to get the sequence of encoded objects:

```js
var oldEncode = mxCodec.prototype.encode;
mxCodec.prototype.encode = function(obj)
{
  mxLog.show();
  mxLog.debug('mxCodec.encode: obj='+mxUtils.getFunctionName(obj.constructor));

  return oldEncode.apply(this, arguments);
};
Note that the I/O system adds object codecs for new object automatically.  For decoding those objects, the constructor should be written as follows:

var MyObj = function(name)
{
  // ...
};
```

## mxCodecRegistry

Singleton class that acts as a global registry for codecs.

Adding an mxCodec:

Define a default codec with a new instance of the object to be handled.

```js
var codec = new mxObjectCodec(new mxGraphModel());
```

Define the functions required for encoding and decoding objects.

```js
codec.encode = function(enc, obj) { ... }
codec.decode = function(dec, node, into) { ... }
```

Register the codec in the mxCodecRegistry.

```js
mxCodecRegistry.register(codec);
```

`mxObjectCodec.decode` may be used to either create a new instance of an object or to configure an existing instance, in which case the into argument points to the existing object.  In this case, we say the codec "configures" the object.

## mxDefaultKeyHandlerCodec

Custom codec for configuring `mxDefaultKeyHandlers`.  This class is created and registered dynamically at load time and used implicitely via `mxCodec` and the `mxCodecRegistry`.  This codec only reads configuration data for existing key handlers, it does not encode or create key handlers.

## mxDefaultPopupMenuCodec

Custom codec for configuring `mxDefaultPopupMenus`.  This class is created and registered dynamically at load time and used implicitely via mxCodec and the `mxCodecRegistry`.  This codec only reads configuration data for existing popup menus, it does not encode or create menus.  Note that this codec only passes the configuration node to the popup menu, which uses the config to dynamically create menus.  See `mxDefaultPopupMenu.createMenu`.

## mxDefaultToolbarCodec

Custom codec for configuring `mxDefaultToolbars`.  This class is created and registered dynamically at load time and used implicitely via `mxCodec` and the `mxCodecRegistry`.  This codec only reads configuration data for existing toolbars handlers, it does not encode or create toolbars.

## mxEditorCodec

Codec for `mxEditors`.  This class is created and registered dynamically at load time and used implicitely via `mxCodec` and the `mxCodecRegistry`.

Transient Fields

- `modified`
- `lastSnapshot`
- `ignoredChanges`
- `undoManager`
- `graphContainer`
- `toolbarContainer`

## mxGenericChangeCodec

Codec for `mxValueChanges`, `mxStyleChanges`, `mxGeometryChanges`, `mxCollapseChanges` and `mxVisibleChanges`.  This class is created and registered dynamically at load time and used implicitely via `mxCodec` and the `mxCodecRegistry`.

Transient Fields

- `model`
- `previous`

Reference Fields

- cell

## mxGraphCodec

Codec for mxGraphs.  This class is created and registered dynamically at load time and used implicitely via mxCodec and the `mxCodecRegistry`.

Transient Fields

- `graphListeners`
- `eventListeners`
- `view`
- `container`
- `cellRenderer`
- `editor`
- `selection`

## mxGraphViewCodec

Custom encoder for `mxGraphViews`.  This class is created and registered dynamically at load time and used implicitely via `mxCodec` and the `mxCodecRegistry`.  This codec only writes views into a XML format that can be used to create an image for the graph, that is, it contains absolute coordinates with computed perimeters, edge styles and cell styles.

## mxModelCodec

Codec for `mxGraphModels`.  This class is created and registered dynamically at load time and used implicitely via `mxCodec` and the `mxCodecRegistry`.

## mxObjectCodec

Generic codec for JavaScript objects that implements a mapping between JavaScript objects and XML nodes that maps each field or element to an attribute or child node, and vice versa.

Atomic Values

Consider the following example.

```js
var obj = new Object();
obj.foo = "Foo";
obj.bar = "Bar";
```

This object is encoded into an XML node using the following.

```js
var enc = new mxCodec();
var node = enc.encode(obj);
```

The output of the encoding may be viewed using mxLog as follows.

```js
mxLog.show();
mxLog.debug(mxUtils.getPrettyXml(node));
```

Finally, the result of the encoding looks as follows.

`<Object foo="Foo" bar="Bar"/>`

In the above output, the foo and bar fields have been mapped to attributes with the same names, and the name of the constructor was used for the nodename.

Booleans

Since booleans are numbers in JavaScript, all boolean values are encoded into 1 for true and 0 for false.  The decoder also accepts the string true and false for boolean values.

Objects

The above scheme is applied to all atomic fields, that is, to all non-object fields of an object.  For object fields, a child node is created with a special attribute that contains the fieldname.  This special attribute is called “as” and hence, as is a reserved word that should not be used for a fieldname.

Consider the following example where foo is an object and bar is an atomic property of foo.

`var obj = {foo: {bar: "Bar"}};`

This will be mapped to the following XML structure by mxObjectCodec.

```xml
<Object>
  <Object bar="Bar" as="foo"/>
</Object>
```

In the above output, the inner Object node contains the as-attribute that specifies the fieldname in the enclosing object.  That is, the field foo was mapped to a child node with an as-attribute that has the value foo.

Arrays

Arrays are special objects that are either associative, in which case each key, value pair is treated like a field where the key is the fieldname, or they are a sequence of atomic values and objects, which is mapped to a sequence of child nodes.  For object elements, the above scheme is applied without the use of the special as-attribute for creating each child.  For atomic elements, a special add-node is created with the value stored in the value-attribute.

For example, the following array contains one atomic value and one object with a field called bar.  Furthermore it contains two associative entries called bar with an atomic value, and foo with an object value.

```js
var obj = ["Bar", {bar: "Bar"}];
obj["bar"] = "Bar";
obj["foo"] = {bar: "Bar"};
```

This array is represented by the following XML nodes.

```xml
<Array bar="Bar">
  <add value="Bar"/>
  <Object bar="Bar"/>
  <Object bar="Bar" as="foo"/>
</Array>
```

The Array node name is the name of the constructor.  The additional as-attribute in the last child contains the key of the associative entry, whereas the second last child is part of the array sequence and does not have an as-attribute.

References

Objects may be represented as child nodes or attributes with ID values, which are used to lookup the object in a table within mxCodec.  The isReference function is in charge of deciding if a specific field should be encoded as a reference or not.  Its default implementation returns true if the fieldname is in idrefs, an array of strings that is used to configure the mxObjectCodec.

Using this approach, the mapping does not guarantee that the referenced object itself exists in the document.  The fields that are encoded as references must be carefully chosen to make sure all referenced objects exist in the document, or may be resolved by some other means if necessary.

For example, in the case of the graph model all cells are stored in a tree whose root is referenced by the model’s root field.  A tree is a structure that is well suited for an XML representation, however, the additional edges in the graph model have a reference to a source and target cell, which are also contained in the tree.  To handle this case, the source and target cell of an edge are treated as references, whereas the children are treated as objects.  Since all cells are contained in the tree and no edge references a source or target outside the tree, this setup makes sure all referenced objects are contained in the document.

In the case of a tree structure we must further avoid infinite recursion by ignoring the parent reference of each child.  This is done by returning true in isExcluded, whose default implementation uses the array of excluded fieldnames passed to the mxObjectCodec constructor.

References are only used for cells in mxGraph.  For defining other referencable object types, the codec must be able to work out the ID of an object.  This is done by implementing mxCodec.reference.  For decoding a reference, the XML node with the respective id-attribute is fetched from the document, decoded, and stored in a lookup table for later reference.  For looking up external objects, mxCodec.lookup may be implemented.

Expressions

For decoding JavaScript expressions, the add-node may be used with a text content that contains the JavaScript expression.  For example, the following creates a field called foo in the enclosing object and assigns it the value of mxConstants.ALIGN_LEFT.

```xml
<Object>
  <add as="foo">mxConstants.ALIGN_LEFT</add>
</Object>
```

The resulting object has a field called foo with the value “left”.  Its XML representation looks as follows.

`<Object foo="left"/>`

This means the expression is evaluated at decoding time and the result of the evaluation is stored in the respective field.  Valid expressions are all JavaScript expressions, including function definitions, which are mapped to functions on the resulting object.

Expressions are only evaluated if allowEval is true.

## mxRootChangeCodec

Codec for `mxRootChanges`.  This class is created and registered dynamically at load time and used implicitely via `mxCodec` and the `mxCodecRegistry`.

Transient Fields

- model
- previous
- root

## mxStylesheetCodec

Codec for `mxStylesheets`.  This class is created and registered dynamically at load time and used implicitely via mxCodec and the `mxCodecRegistry`.

## mxTerminalChangeCodec

Codec for `mxTerminalChanges`.  This class is created and registered dynamically at load time and used implicitely via mxCodec and the `mxCodecRegistry`.

Transient Fields

- model
- previous

Reference Fields

- cell
- terminal

