import mx from "./mx";
const { mxOutline } = mx

export class Outline {
  outline: any

  constructor(graph: any, outlineContainer: Element) {
    this.outline = new mxOutline(graph, outlineContainer);
  }
}