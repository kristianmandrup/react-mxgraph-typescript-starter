import { mxgraphFactory } from "ts-mxgraph";

const { mxCylinder, mxUtils } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export const createShapeExtension = (shapeConstructor = mxCylinder) => {
  function MyShape(this: any, ...args) {
    const ctx = this
    mxCylinder.call(ctx, undefined, undefined, undefined);
  };
  
  mxUtils.extend(MyShape, mxCylinder);
  return MyShape
}
