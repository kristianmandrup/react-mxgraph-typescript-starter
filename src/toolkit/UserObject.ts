import { mxgraphFactory } from "ts-mxgraph";

const { mxUtils } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export class UserObject {
  doc: any
  obj: any

  // Creates a user object that stores the state
  constructor(title, xmlDoc?: any) {
    this.doc = xmlDoc || mxUtils.createXmlDocument();
    this.setTitle(title)
  }

  setTitle(name: string) {
    this.obj = this.doc.createElement('UserObject');
  }
  
  setValue(key: string, value: any) {
    this.obj.setAttribute(key, value);
  }

  setValues(valueMap: any) {
    Object.keys(valueMap).map(key => this.setValue(key, valueMap[key]))
  }  
}
