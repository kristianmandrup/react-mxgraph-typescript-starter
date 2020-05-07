import { createShapeExtension } from './Extends';
import { mxgraphFactory } from "ts-mxgraph";

const { mxCellRenderer } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

interface ICustomShape {
  register(name: string)
  redrawPath(path, _x, _y, w, h, isForeground)
}

export class CustomShape implements ICustomShape {
  shape: any
  name: string

  constructor(name: string, shapeConstructor?: any) {
    const shape: any = createShapeExtension(shapeConstructor)
    this.shape = shape

    if (!name) {
      throw new Error('Shape missing name for registration')
    }
    this.name = name

    shape.prototype.redrawPath = this.redrawPath
    this.register(this.name)
  }

  register(name: string) {
    mxCellRenderer.registerShape(name, this.shape.constructor);  
  }  

  redrawPath(path, _x, _y, w, h, isForeground) {
  }
}