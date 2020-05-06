import { mxgraphFactory } from "ts-mxgraph";

const { mxEvent, mxUtils, mxWindow, mxEffects } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

const isValidEvt = (evt) => !mxEvent.isConsumed(evt)
const isValidCell = (graph, cell) => cell != null && graph.isCellEditable(cell)

const canOpenModal = (graph, evt, cell) =>
  graph.isEnabled() && isValidEvt(evt)  && isValidCell(graph, cell)

export const showModalWindow = (graph, content, {title, size, background}) => {
  var background = document.createElement('div');
  background.style.position = 'absolute';
  background.style.left = '0px';
  background.style.top = '0px';
  background.style.right = '0px';
  background.style.bottom = '0px';
  background.style.background = background || 'black';
  mxUtils.setOpacity(background, 50);
  document.body.appendChild(background);
    
  const { width, height } = size
  const maxWidth = document.body.scrollWidth / 2 - width / 2
  const x = Math.max(0, maxWidth);
  const maxHeight = (document.body.scrollHeight || document.documentElement.scrollHeight) / 2-height * 2/3;
  const y = Math.max(10, maxHeight);
  const wnd = new mxWindow(title, content, x, y, width, height, false, true);
  wnd.setClosable(true);
  
  // Fades the background out after after the window has been closed
  wnd.addListener(mxEvent.DESTROY, (evt) => {
    graph.setEnabled(true);
    mxEffects.fadeOut(background, 50, true, 
      10, 30, true);
  });

  graph.setEnabled(false);
  graph.tooltipHandler.hide();
  wnd.setVisible(true);
};

export class ModalWindow {
  graph: any
  showModalWindow: any  
  props: any

  constructor(graph: any, showModalWindow: any, props: any) {
    this.graph = graph
    this.showModalWindow = showModalWindow
    this.props = props
  }

  modalContent(cell) {
    return this.graph.convertValueToString(cell);
  }

  onEvent(evt, cell) {
    const { graph } = this
    if (!canOpenModal(graph, evt, cell)) mxEvent.consume(evt);
    if (graph.model.isEdge(cell) || !graph.isHtmlLabel(cell)) {
      graph.startEditingAtCell(cell);
    } else {
      var content = document.createElement('div');
      content.innerHTML = this.modalContent(cell)
      const props = {
        content,
        title: 'Properties',
        size: {
          width: 400, 
          height: 300
        },
        ...this.props
      }
      this.showModalWindow(graph, content, props);
    }
    // Disables any default behaviour
    mxEvent.consume(evt);
  }
}  
