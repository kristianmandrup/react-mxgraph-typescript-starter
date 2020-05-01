# mxPrintPreview


Implements printing of a diagram across multiple pages.  The following opens a print preview for an existing graph:

```js
var preview = new mxPrintPreview(graph);
preview.open();
```

Use mxUtils.getScaleForPageCount as follows in order to print the graph across a given number of pages:

```js
var pageCount = mxUtils.prompt('Enter page count', '1');

if (pageCount != null)
{
  var scale = mxUtils.getScaleForPageCount(pageCount, graph);
  var preview = new mxPrintPreview(graph, scale);
  preview.open();
}
```

Additional pages

To add additional pages before and after the output, getCoverPages and getAppendices can be used, respectively.

```js
var preview = new mxPrintPreview(graph, 1);

preview.getCoverPages = function(w, h)
{
  return [this.renderPage(w, h, 0, 0, mxUtils.bind(this, function(div)
  {
    div.innerHTML = '<div style="position:relative;margin:4px;">Cover Page</p>'
  }))];
};

preview.getAppendices = function(w, h)
{
  return [this.renderPage(w, h, 0, 0, mxUtils.bind(this, function(div)
  {
    div.innerHTML = '<div style="position:relative;margin:4px;">Appendix</p>'
  }))];
};

preview.open();
```


## CSS

The CSS from the original page is not carried over to the print preview.  To add CSS to the page, use the css argument in the open function or override writeHead to add the respective link tags as follows:

```js
var writeHead = preview.writeHead;
preview.writeHead = function(doc, css)
{
  writeHead.apply(this, arguments);
  doc.writeln('<link rel="stylesheet" type="text/css" href="style.css">');
};
```

## Padding

To add a padding to the page in the preview (but not the print output), use the following code:

```js
preview.writeHead = function(doc)
{
  writeHead.apply(this, arguments);

  doc.writeln('<style type="text/css">');
  doc.writeln('@media screen {');
  doc.writeln('  body > div { padding-top:30px;padding-left:40px;box-sizing:content-box; }');
  doc.writeln('}');
  doc.writeln('</style>');
};
```

## Headers

Apart from setting the title argument in the mxPrintPreview constructor you can override renderPage as follows to add a header to any page:

```js
var oldRenderPage = mxPrintPreview.prototype.renderPage;
mxPrintPreview.prototype.renderPage = function(w, h, x, y, content, pageNumber)
{
  var div = oldRenderPage.apply(this, arguments);

  var header = document.createElement('div');
  header.style.position = 'absolute';
  header.style.top = '0px';
  header.style.width = '100%';
  header.style.textAlign = 'right';
  mxUtils.write(header, 'Your header here');
  div.firstChild.appendChild(header);

  return div;
};
```

The pageNumber argument contains the number of the current page, starting at 1.  To display a header on the first page only, check pageNumber and add a vertical offset in the constructor call for the height of the header.

## Page Format

For landscape printing, use `mxConstants.PAGE_FORMAT_A4_LANDSCAPE` as the `pageFormat` in `mxUtils`.`getScaleForPageCount` and `mxPrintPreview`.  Keep in mind that one can not set the defaults for the print dialog of the operating system from JavaScript so the user must manually choose a page format that matches this setting.

You can try passing the following CSS directive to open to set the page format in the print dialog to landscape.  However, this CSS directive seems to be ignored in most major browsers, including IE.

```css
@page {
  size: landscape;
}
```

Note that the print preview behaves differently in IE when used from the filesystem or via HTTP so printing should always be tested via HTTP.

If you are using a `DOCTYPE` in the source page you can override `getDoctype` and provide the same DOCTYPE for the print preview if required.  Here is an example for IE8 standards mode.

```js
var preview = new mxPrintPreview(graph);
preview.getDoctype = function()
{
  return '<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=8" ><![endif]-->';
};
preview.open();
```