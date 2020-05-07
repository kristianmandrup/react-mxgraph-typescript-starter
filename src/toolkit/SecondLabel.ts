import mx from "./mx";
const { mxRectangle } = mx

export class SecondLabel {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  setGetSecondLabelFn(getSecondLabel: (state) => any) {
    const { graph } = this
    graph.getSecondLabel = (cell) => {
      if (graph.model.isEdge(cell)) return
      // Possible to return any string here
      return cell.id;
    }
  }

  setRedrawShapeSecondLabel() {
    const { graph } = this
    // Creates the shape for the shape number and puts it into the draw pane
    const redrawShape = graph.cellRenderer.redrawShape;
    graph.cellRenderer.redrawShape = (state, force, rendering) => {
      var result = redrawShape.apply(this, arguments);
      if (state.secondLabel != null) {
        var scale = graph.getView().getScale();
        var bounds = new mxRectangle(state.x + state.width - 8 * scale, state.y + 8 * scale, 35, 0);
        state.secondLabel.state = state;
        state.secondLabel.value = graph.getSecondLabel(state.cell);
        state.secondLabel.scale = scale;
        state.secondLabel.bounds = bounds;
        state.secondLabel.redraw();
      }      
      return result;
    }
  }  
}