import mx from "./mx";
import { IPosition, ISize } from '../types';
const { mxPoint } = mx

type OffsetParams = {
  offSet?: IPosition
  direction?: string
  index?: number
}
type SetVertexOpts = {style: string = '', pos: IPosition, size: ISize}

export class ConnectorShape {
  graph: any
  vertex: any
  vProto: any
  defaultStyle = 'fontColor=' + 'black' + ';strokeColor=' + 'black'

  constructor(graph: any, {defaultStyle}: any = {}) {
    this.graph = graph
    if (defaultStyle) {
      this.defaultStyle = defaultStyle 
    }    
  }

  setVertex(parent: any, {style, pos, size }: SetVertexOpts) {
    const { graph } = this
    // TODO: merge with default pos, size objects
    const { x, y } = pos
    const { width, height } = size
    const vertex = graph.insertVertex(parent, null, 'J1', x || 80, y || 40, width || 40, height || 80, style);
    vertex.setConnectable(false);  
    this.vertex = vertex
  }

  get connectorStyle() {
    return `shape=line;align=left;verticalAlign=middle;fontSize=10;` +
    `routingCenterX=-0.5;spacingLeft=12;`+ this.defaultStyle  
  }

  get offSets() {
    return {
      y: [2, 22, 42, 62],
      yStart: 2,
      ySpace: 20,
      west: (vProto) => -vProto.geometry.width,
      east: (_) => 0
    }
  }

  connectorProto({pos, size, offset}: {pos?: IPosition, size?: ISize, offset?: OffsetParams} = {}) {
    const { graph, vertex } = this
    pos = {
      ...{
        x: 0,
        y: 0
      },
      ...pos
    }
    size = {
      ...{
        width: 10,
        height: 16
      },
      ...size
    }
    const { x, y } = pos
    const { width, height } = size
    var vProto = graph.insertVertex(vertex, null, '1', x, y, width, height, this.connectorStyle);
    vProto.geometry.relative = true;
    
    const defaultOffset = {index: 0, direction: 'west'}
    offset = {
      ...defaultOffset,
      ...offset
    }

    const offPos = this.calcPos(vertex, offset)
    vProto.geometry.offset = new mxPoint(offPos.x, offPos.y);
    this.vProto = vProto
    return vProto
  }

  connector(value: string, props: OffsetParams = {}) {
    const { vertex, vProto } = this
    var vconn = vProto.clone();
    vconn.value = value;
    const pos = this.calcPos(vProto, props)
    vconn.geometry.offset = new mxPoint(pos.x, pos.y);
    vertex.insert(vconn);  
  }

  calcPos(v, {offSet, direction, index }: OffsetParams = {}): IPosition {
    direction = direction || 'west'
    index = index || 0
    const { offSets } = this
    const { y, yStart, ySpace } = offSets
    const posX = offSets[direction](v)
    const posY = (offSet && offSet.y) || y[index] || (yStart + (index * ySpace))  
    return { x: posX, y: posY }
  }
}
