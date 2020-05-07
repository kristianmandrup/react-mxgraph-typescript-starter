import { CustomShape } from './CustomShape';
import mx from "../mx";
const { mxCylinder } = mx

export class MessageShape extends CustomShape {
  constructor() {
    super('message', mxCylinder)     
  }

  init() {
    this.shape.prototype.redrawPath = this.redrawPath
  }

  redrawPath(path, x, y, w, h, isForeground) {
    if (isForeground) {
      path.moveTo(0, 0);
      path.lineTo(w / 2, h / 2);
      path.lineTo(w, 0);
      return
    }
    // background
    path.moveTo(0, 0);
    path.lineTo(w, 0);
    path.lineTo(w, h);
    path.lineTo(0, h);
    path.close();
  }
}
