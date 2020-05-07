import mx from "./mx";
const { mxUtils, mxConstants, mxPerimeter } = mx

interface IStyleArgs {
  strokeColor?: string
  edgeStyle?: string
  fillColor?: string
  shape?: string
  image?: string
  verticalLabelPosition?: string
  verticalAlign?: string
  imageBackground?: string
  imageBorder?: string
  startSize?: number
  noLabel?: number
  labelPosition?: string
}

const addStyle = (acc, name, value) => {
  if (!value || value === '') return acc
  const item = [name, value].join('=')
  acc.push(item)
  return acc          
}

export class TwoWayEdgeStyle {
  graph: any
  style: any

  constructor(graph: any) {
    this.graph = graph
  }

  create() {
    const { graph } = this

    // Changes the default vertex style in-place
    let style = graph.getStylesheet().getDefaultVertexStyle();
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ROUNDED;
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
    style[mxConstants.STYLE_PERIMETER_SPACING] = 4;
    style[mxConstants.STYLE_SHADOW] = true;
    
    style = graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
            
    style = mxUtils.clone(style);
    style[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_CLASSIC;
    this.style = style    
  }

  registerInStylesheet(style) {
    const { graph } = this
    style = style || this.style
    graph.getStylesheet().putCellStyle('2way', style);    
  }
}

export class StyleCombiner {
  combine(oldStyle: string, newStyle: string) {    
    const oldStyles = oldStyle.split(';')
    const newStyles = newStyle.split(';')
  
  
    const oldStylesMap = this.stylesToMap(oldStyles)
    const newsStylesMap = this.stylesToMap(newStyles)
    const mergedStylesMap = {
      ...oldStylesMap,
      ...newsStylesMap
    }  
    return this.explodeStyleMap(mergedStylesMap).join(';')
  }

  explodeStyleMap(styleMap: any) {
    const keys: string[] = Object.keys(styleMap) || []
    return keys.reduce((acc: string[], key) => {
      const styl = key + '=' + styleMap[key]
      return acc.concat(styl)
    }, [])
  }

  constraintsForDirections(directions: string[], count: number): {} {
    return directions.reduce((acc, direction) => {
      acc[direction] = 'x'
      return acc
    }, {})
  }

  nameOf(style): string {
    return style.split('=')[0]
  }
  
  valueOf(style): string {
    return style.split('=')[1]
  }


  stylesToMap(styles): any {
    return styles.reduce((acc, style) => {
      const name = this.nameOf(style)
      const val = this.valueOf(style)
      acc[name] = val
      return acc
    })
  }

}


export class Style {
  _strokeColor: string = ''
  _edgeStyle: string = ''
  _fillColor: string = ''

  constructor({strokeColor, edgeStyle, fillColor}: IStyleArgs) {
    this.strokeColor = strokeColor || ''
    this.edgeStyle = edgeStyle || ''
    this.fillColor = fillColor || ''
  }

  set strokeColor(color: string) {
    this._strokeColor = color
  }

  get strokeColor(): string {
    return this._strokeColor
  }

  set edgeStyle(style: string) {
    this._edgeStyle = style
  }

  get edgeStyle() {
    return this._edgeStyle
  }

  set fillColor(color: string) {
    this._fillColor = color
  }

  get fillColor() {
    return this._fillColor
  }

  get styles() {
    return ['strokeColor', 'edgeStyle', 'fillColor']
  } 

  get style() {
    return this.styles.reduce((acc, name) => {
      const value = this[name]
      return addStyle(acc, name, value)
    }, []).join(';')
  }
}