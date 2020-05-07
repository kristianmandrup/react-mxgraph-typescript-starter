import mx from "../mx";
import { IPosition, ISize } from '../types';
const { mxPoint } = mx

type OffsetParams = {
  offSet?: IPosition
  direction?: string
  index?: number
}

type CenterConnParams = {
  offSet?: IPosition
  pos?: IPosition
  size?: ISize
}

type SetVertexOpts = {style: string, pos: IPosition, size: ISize}

export class ConnectorShape {
  graph: any
  vertex: any
  vProto: any
  color = `black`

  constructor(graph: any, { color }: any = {}) {
    this.graph = graph
    this.color = color
  }

  get defaultStyle() {
    const { color } = this
    return `fontColor=${color};strokeColor=${color}`
  }

  setVertex(parent: any, {style, pos, size }: SetVertexOpts) {
    const { graph } = this
    pos = {
      x: 80,
      y: 40,
      ...pos || {}
    }
    size = {
      width: 80,
      height: 40,
      ...size || {}
    }
    
    const { x, y } = pos
    const { width, height } = size
    const vertex = graph.insertVertex(parent, null, 'J1', x, y, width, height, style);
    vertex.setConnectable(false);  
    this.vertex = vertex
  }

  connectorStyle(direction = 'west') {
    const { defaultStyle } = this
    return this.connStyles[direction] + defaultStyle    
  }

  get connStyles() {    
    return {
      west: `shape=line;align=left;verticalAlign=middle;fontSize=10;routingCenterX=-0.5;spacingLeft=12;`,
      east: `shape=line;align=right;verticalAlign=middle;fontSize=10;routingCenterX=0.5;spacingRight=12;`,
      center: `shape=triangle;direction=south;spacingBottom=12;align=center;portConstraint=horizontal;fontSize=8`
    }
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
      x: 0,
      y: 0,
      ...pos
    }
    size = {
      width: 10,
      height: 16,
      ...size
    }
    const { x, y } = pos
    const { width, height } = size
    const style = this.connectorStyle(offset && offset.direction)
    var vProto = graph.insertVertex(vertex, null, '1', x, y, width, height, style);
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
    const { direction } = props
    const style = this.connectorStyle(direction)
    vconn.geometry.offset = new mxPoint(pos.x, pos.y);
    vconn.setStyle(style)
    vertex.insert(vconn);  
  }

  centerConnector(props: CenterConnParams = {}) {
    const { vertex, vProto } = this
    let { offSet, size, pos } = props
    size = {
      width: 10,
      height: 4,
      ...size || {}
    } 
    pos = {
      x: 0.5,
      y: 1,
      ...pos || {}
    } 

    var vconn = vProto.clone();
    vconn.value = 'clk';
    vconn.geometry.x = pos.x;
    vconn.geometry.y = pos.y;
    vconn.geometry.width = size.width;
    vconn.geometry.height = size.height;

    vconn.style =  this.connectorStyle('center');
    
    offSet = {
      x: -4,
      y: -4,
      ...offSet || {}
    }

    vconn.geometry.offset = new mxPoint(offSet.x, offSet.y);
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
