import { CustomShape } from './CustomShape';
import mx from "../mx";
const { mxCylinder } = mx

export class BoxShape extends CustomShape {
  extrude = 10

  constructor() {
    super('box', mxCylinder)    
  }

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
  

	
