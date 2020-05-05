import { mxgraphFactory } from "ts-mxgraph";

const { mxEvent } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

const isValidEvt = (evt) => !mxEvent.isConsumed(evt)
const isValidCell = (graph, cell) => cell != null && graph.isCellEditable(cell)

const canOpenModal = (graph, evt, cell) =>
  graph.isEnabled() && isValidEvt(evt)  && isValidCell(graph, cell)

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
