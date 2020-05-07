import { mxgraphFactory } from "ts-mxgraph";

const { mxCylinder, mxUtils } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export const createShapeExtension = (shapeConstructor = mxCylinder) => {
  function MyShape(this: any, ...args) {
    const ctx = this
    shapeConstructor.call(ctx, undefined, undefined, undefined);
  };
  
  mxUtils.extend(MyShape, shapeConstructor);  
  return MyShape
}
