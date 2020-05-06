import { mxgraphFactory } from "ts-mxgraph";

const { mxEvent, mxUtils, mxGeometry, mxCell, mxToolbar } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

type IaddToolbarItemFn = (graph: any, toolbar: any, cellPrototype: any, image: any) => void

export const createToolbarForElement = (tbContainer: Element) => {
  const toolbar: any = new mxToolbar(tbContainer);
  toolbar.enabled = false  
  return toolbar
}

export const createToolbar = (graph: any, tbContainer: Element) => {
  const toolbar = createToolbarForElement(tbContainer)
  return new Toolbar(graph, toolbar)
}

export const createToolbarDOMElement = ({top, width}: {top: number, width: number} = {width: 24, top: 26}): Element => {
  width = width || 24
  top = top || 26  
  // Creates the div for the toolbar
  var tbContainer = document.createElement('div');
  tbContainer.style.position = 'absolute';
  tbContainer.style.overflow = 'hidden';
  tbContainer.style.padding = '2px';
  tbContainer.style.left = '0px';
  tbContainer.style.top = `${top}px`;
  tbContainer.style.width = `${width}`;
  tbContainer.style.bottom = '0px';    
  return tbContainer
}

export class Toolbar {
  graph: any
  toolbar: any
  addToolbarItem: IaddToolbarItemFn

  constructor(graph: any, toolbar: any) {  
    this.graph = graph
    this.toolbar = toolbar
    this.addToolbarItem = createAddToolbarItem(graph, toolbar)
  }

  addVertex(icon: any, w: number, h: number, style: any, addToolbarItem?: IaddToolbarItemFn) {
    const { graph, toolbar } = this
    const geometry = new mxGeometry(0, 0, w, h)
    var vertex = new mxCell(null, geometry, style);
    vertex.setVertex(true);
    addToolbarItem = addToolbarItem || this.addToolbarItem  
    addToolbarItem(graph, toolbar, vertex, icon);
  };  
}

export const createAddToolbarItem = (graph: any, toolbar: any) => (cellPrototype: any, image: any) => {
  const toolbarItem = new ToolbarItem(graph, toolbar)
  toolbarItem.add(cellPrototype, image)
}

export const addToolbarItem = (graph: any, toolbar: any, cellPrototype: any, image: any) => {
  const toolbarItem = new ToolbarItem(graph, toolbar)
  toolbarItem.add(cellPrototype, image)
}

export class ToolbarItem {
  graph: any
  toolbar: any
  editor: any

  constructor(graph: any, toolbar: any, { editor, createOnDropItem }:any = {}) {
    this.graph = graph
    this.toolbar = toolbar
    this.editor = editor || graph.editor
    if (createOnDropItem) {
      this.createOnDropItem = createOnDropItem
    }    
  }

  // Function that is executed when the image is dropped on
  // the graph. The cell argument points to the cell under
  // the mousepointer if there is one.
  createOnDropItem = (cellPrototype: any) =>
    (graph: any, evt: any, cell: any) => {
      console.log({graph, evt, cell})
      graph.stopEditing(false);

      var pt = graph.getPointForEvent(evt);
      var vertex = graph.getModel().cloneCell(cellPrototype);
      vertex.geometry.x = pt.x;
      vertex.geometry.y = pt.y;
      
      graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
    }

  

  add(cellPrototype: any, image: any) {
    const { graph, toolbar, createOnDropItem } = this
    const onDropItem = createOnDropItem(cellPrototype)
    // Creates the image which is used as the drag icon (preview)    
    const dragIconImg = toolbar.addMode(null, image, onDropItem);
    mxUtils.makeDraggable(dragIconImg, graph, onDropItem);
    return this
  }

  addMap(itemMap: any) {
    Object.keys(itemMap).map(name => {
      const { cell, image } = itemMap[name]
      return this.add(cell, image)
    })
  }

  execute(action) {
    this.editor.execute(action)
  }

  addToolbarButtons(itemMap: any) {
    Object.keys(itemMap).map(name => {
      const { action, label, image, props } = itemMap[name]
      return this.addToolbarButton(action, label, image, props)
    })
  }

  get spacer() {
    return this.toolbar.spacer
  }

  addToolbarButton(action, label, image, props: any = {}) {
    let {spacer, size, margin, isTransparent} = props
    const { toolbar, editor } = this
    var button = document.createElement('button');
    button.style.fontSize = '10';
    size = {
      width: 16,
      height: 16,
      ...size
    }
    margin = margin || 2

    if (image != null) {
      var img = document.createElement('img');
      img.setAttribute('src', image);
      img.style.width = `${size.width}px`;
      img.style.height = `${size.height}px`;
      img.style.verticalAlign = 'middle';
      img.style.marginRight = `${margin}px`;
      button.appendChild(img);
    }
    if (isTransparent) {
      button.style.background = 'transparent';
      button.style.color = '#FFFFFF';
      button.style.border = 'none';
    }
    mxEvent.addListener(button, 'click', (evt) => {
      editor.execute(action);
    });
    mxUtils.write(button, label);
    toolbar.appendChild(button);

    if (spacer || this.spacer) {
      toolbar.appendChild(this.spacer.cloneNode(true));
    }    
  };  
}