import mx from "./mx";
import { IPosition, ISize } from './types';
const { mxPoint } = mx

// 1,0: top right
// 1,1: bottom right
// -1,0: top left
// -1,1: bottom left
export class PortPosition {
  static topRight(): IPosition {
    return {x: 1, y: 0}
  }

  static bottomRight(): IPosition {
    return {x: 1, y: 1}
  }

  static topLeft(): IPosition {
    return {x: -1, y: 0}
  }

  static bottomLeft(): IPosition {
    return {x: -1, y: 1}
  }
}

export class Vertex {
  graph: any
  vertex: any

  constructor(graph: any, vertex: any) {
    this.graph = graph
    this.vertex = vertex
  } 

  setGeometry(geometry) {
    this.vertex.geometry = geometry
  }

  addGeometry(geometry) {
    this.vertex.geometry = {
      ...this.vertex.geometry,
      geometry
    }
  }

  setAlternateBounds(boundsVertex) {
    this.vertex.geometry.alternateBounds = boundsVertex
  }

  insertPortVertex(pos: IPosition, size: ISize, {id, label}: any = {}) {
    const midX = -(size.width / 2)
    const midY = -(size.height / 2)

    var portVertex = this.graph.insertVertex(this.vertex, id, label, pos.x, pos.y, size.width, size.height);
    portVertex.geometry.offset = new mxPoint(midX, midY);
    portVertex.geometry.relative = true;  
  }
}