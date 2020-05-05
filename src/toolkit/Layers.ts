import { mxgraphFactory } from "ts-mxgraph";
import { IGraph } from './Graph';
import { IPosition, ISize } from './types';

const { mxUtils, mxCell } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export const setGeometryPoints = (cell: any, points?: any) => {
  if (points) {
    points = Array.isArray(points) ? points : [points]
    cell.geometry.points = [points]
  }
  return cell
}

interface InsertVertexOpts {
  constituent?: boolean
  id?: string
  relative?: boolean
  geometry?: any
}

export class DrawLayer {
  layer: any
  graph: any

  constructor(graph: any, layer: any) {
    this.graph = graph
    this.layer = layer
  }

  insertVertex(labelOrValue: any, pos: IPosition, size: ISize, style: string, {constituent, id, relative, geometry}: InsertVertexOpts = {}): any {
    if (constituent) {
      style = 'constituent=1;' + style
    }
    const vertex = this.graph.insertVertex(this.layer, id, labelOrValue, pos.x, pos.y, size.width, size.height, style, relative)
    if (geometry) {
      vertex.geometry = vertex
    }    
    return vertex
  }

  insertEdge(labelOrValue: any, fromVertex: any, toVertex: any, style: string, {id, relative, points}: any = {}): any {
    id = id || null
    const edge = this.graph.insertEdge(this.layer, id, labelOrValue, fromVertex, toVertex, style, relative)
    if (points) setGeometryPoints(edge)
    return edge
  }
}

export class Layers {
  graph: IGraph
  root: any  
  layers: { [key:string]: any } = {}

  constructor(graph: any, root: any = new mxCell()) {
    this.graph = graph
    this.root = root
  }

  drawLayer(name: string) {
    return new DrawLayer(this.graph, this.getLayer(name))
  }

  getLayer(name: string): any {
    if (!this.layers[name]) {
      throw new Error(`Layer ${name} has not been created`)
    }
    return this.layers[name]
  }

  addLayer(name: string) {
    const layer = this.root.insert(new mxCell());
    this.layers[name] = layer
    return layer
  }

  layerButtonFor(name: string, label: string = name) {
    const { model } = this.graph.model
    return mxUtils.button(label, () => {
      const layer = this.getLayer(name)
      model.setVisible(layer, !model.isVisible(layer));
    })    
  }
}
