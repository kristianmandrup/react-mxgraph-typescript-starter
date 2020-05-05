import { mxgraphFactory } from "ts-mxgraph";

const { mxOutline } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export class Outline {
  outline: any

  constructor(graph: any, outlineContainer: Element) {
    this.outline = new mxOutline(graph, outlineContainer);
  }
}