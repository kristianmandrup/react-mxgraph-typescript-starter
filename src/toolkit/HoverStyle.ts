import mx from "./mx";
const { mxUtils, mxConstants } = mx

export class HoverStyle {
  graph: any
  currentState:any = null
  previousStyle: any = null

  constructor(graph: any) {
    this.graph = graph
  }

  setGraphMouseListener() {
    const { graph } = this
    // Shows icons if the mouse is over a cell
    graph.addMouseListener({
      mouseDown: this.mouseDown,
      mouseMove: this.mouseMove,
      mouseUp: this.mouseUp,
      dragEnter: this.dragEnter,
      dragLeave: this.dragLeave
    });  
  }

  mouseDown(sender, me) {
    if (this.currentState != null) {
      this.dragLeave(me.getEvent(), this.currentState);
      this.currentState = null;
    }
  }

  mouseMove(sender, me) {
    const { graph } = this
    if (this.currentState != null && me.getState() === this.currentState) {
        return;
    }

    var tmp = graph.view.getState(me.getCell());

    // Ignores everything but vertices
    if (graph.isMouseDown || (tmp != null && !
        graph.getModel().isVertex(tmp.cell))) {
      tmp = null;
    }

    if (tmp !== this.currentState) {
        if (this.currentState != null)
        {
            this.dragLeave(me.getEvent(), this.currentState);
        }

        this.currentState = tmp;

        if (this.currentState != null)
        {
            this.dragEnter(me.getEvent(), this.currentState);
        }
    }
  }

  mouseUp(sender, me) { }

  dragEnter(evt, state) {
    if (state == null) return
    this.previousStyle = state.style;
    state.style = mxUtils.clone(state.style);
    this.updateStyle(state, true);
    state.shape.apply(state);
    state.shape.redraw();
    
    if (state.text != null)
    {
      state.text.apply(state);
      state.text.redraw();
    }
  }

  dragLeave(evt, state) {
    if (state == null) return

    state.style = this.previousStyle;
    this.updateStyle(state, false);
    state.shape.apply(state);
    state.shape.redraw();
    
    if (state.text != null)
    {
      state.text.apply(state);
      state.text.redraw();
    }
  }

  updateStyle(state, hover) {
    if (hover)
    {
      state.style[mxConstants.STYLE_FILLCOLOR] = '#ff0000';
    }
    
    // Sets rounded style for both cases since the rounded style
    // is not set in the default style and is therefore inherited
    // once it is set, whereas the above overrides the default value
    state.style[mxConstants.STYLE_ROUNDED] = (hover) ? '1' : '0';
    state.style[mxConstants.STYLE_STROKEWIDTH] = (hover) ? '4' : '1';
    state.style[mxConstants.STYLE_FONTSTYLE] = (hover) ? mxConstants.FONT_BOLD : '0';
  };  
}