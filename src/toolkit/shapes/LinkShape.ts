import { CustomShape } from './CustomShape';
import mx from "../mx";
const { mxArrow } = mx

export class LinkShape extends CustomShape {
  constructor() {
    super('link', mxArrow) 
  }

  init() {
    this.shape.prototype.paintEdgeShape = this.paintEdgeShape
  }

  paintEdgeShape(c, pts) {
    const width = 10;
  
    // Base vector (between end points)
    const p0 = pts[0];
    const pe = pts[pts.length - 1];
    
    const dx = pe.x - p0.x;
    const dy = pe.y - p0.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const length = dist;
    
    // Computes the norm and the inverse norm
    const nx = dx / dist;
    const ny = dy / dist;
    const basex = length * nx;
    const basey = length * ny;
    const floorx = width * ny/3;
    const floory = -width * nx/3;
    
    // Computes points
    const p0x = p0.x - floorx / 2;
    const p0y = p0.y - floory / 2;
    const p1x = p0x + floorx;
    const p1y = p0y + floory;
    const p2x = p1x + basex;
    const p2y = p1y + basey;
    const p3x = p2x + floorx;
    const p3y = p2y + floory;
    // p4 not necessary
    const p5x = p3x - 3 * floorx;
    const p5y = p3y - 3 * floory;
    
    c.begin();
    c.moveTo(p1x, p1y);
    c.lineTo(p2x, p2y);
    c.moveTo(p5x + floorx, p5y + floory);
    c.lineTo(p0x, p0y);
    c.stroke();
  }
}

