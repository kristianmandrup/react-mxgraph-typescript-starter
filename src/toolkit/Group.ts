import { mxgraphFactory } from "ts-mxgraph";

const { mxCell, mxGeometry } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export class Group {
  group: any
  
  constructor() {
    const group = new mxCell('Group', new mxGeometry(), 'group');
    group.setVertex(true);
    group.setConnectable(false);    
    this.group = group
  }
  
}

