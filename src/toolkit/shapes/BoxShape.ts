import { mxgraphFactory } from "ts-mxgraph";
import { createShapeExtension } from './Extends';

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

  constructor(shapeConstructor?: any) {
    const shape: any = createShapeExtension(shapeConstructor)
    this.shape = shape
    shape.prototype.redrawPath = this.redrawPath
  }

  register(name: string) {
    mxCellRenderer.registerShape(name, this.shape.constructor);  
  }  

  redrawPath(path, _x, _y, w, h, isForeground) {
  }
}

export class BoxShape extends CustomShape {
  extrude = 10

  /*
      the mxCylinder's redrawPath method is "overridden".
      This method has a isForeground argument to separate two
      paths, one for the background (which must be closed and
      might be filled) and one for the foreground, which is
      just a stroke.

      Foreground:       /
                  _____/
                        |
                        |
                    ____  
      Background:  /    | 
                  /     | 
                  |     / 
                  |____/ 
  */  
  redrawPath(path, _x, _y, w, h, isForeground) {
    const { shape } = this
    var dy = this.extrude * shape.scale;
    var dx = this.extrude * shape.scale;
  
    if (isForeground) {
      path.moveTo(0, dy);
      path.lineTo(w - dx, dy);
      path.lineTo(w, 0);
      path.moveTo(w - dx, dy);
      path.lineTo(w - dx, h);
    }
    else {
      path.moveTo(0, dy);
      path.lineTo(dx, 0);
      path.lineTo(w, 0);
      path.lineTo(w, h - dy);
      path.lineTo(w - dx, h);
      path.lineTo(0, h);
      path.lineTo(0, dy);
      path.lineTo(dx, 0);
      path.close();
    }
  } 
};
  

	
