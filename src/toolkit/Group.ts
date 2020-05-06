import mx from "./mx";
const { mxCell, mxGeometry } = mx

export class Group {
  group: any
  
  constructor() {
    const group = new mxCell('Group', new mxGeometry(), 'group');
    group.setVertex(true);
    group.setConnectable(false);    
    this.group = group
  }
  
}

