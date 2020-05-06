import { mxgraphFactory } from "ts-mxgraph";

const { mxEvent } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});


export class PopupMenu {
  graph: any
  popupMenuHandler: any

  items: any = {}

  constructor(graph: any, items?: any) {
    this.graph = graph
    this.popupMenuHandler = graph.popupMenuHandler
    this.setAutoExpand(true)
    this.items = items
  }

  setItems(items) {
    this.items = items
  }

  setAutoExpand(value: boolean) {
    this.popupMenuHandler.autoExpand = value
  }

  init() {
    this.popupMenuHandler.isSelectOnPopup = this.isSelectOnPopup
  }
  				
  isSelectOnPopup(me) {
    return mxEvent.isMouseEvent(me.getEvent());
  };
  
    // Installs context menu
  factoryMethod(menu, cell, evt) {
    const { items } = this
    this.addItemsToMenu(menu, items)
  }

  addItemsToMenu(menu, items, submenu?: any) {
    Object.keys(items).map(key => {
      const item = items[key]
      this.addItemToMenu(menu, item)
      if (item.sub) {
        const { sub } = items
        const submenu = menu.addItem(sub.title, null, null);
        this.addItemsToMenu(menu, sub.items, submenu)
      }
    })  
  }

  addItemToMenu(menu, item, submenu?: any) {
    const mi = menu.addItem(item.label, null, item.action, submenu)
    if (item.separator) {
      menu.addSeparator();
    }
    return mi
  }

}
