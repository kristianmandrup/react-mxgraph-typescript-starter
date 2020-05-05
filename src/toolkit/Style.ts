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
}


const addStyle = (acc, name, value) => {
  if (!value || value === '') return acc
  const item = [name, value].join('=')
  acc.push(item)
  return acc          
}


export class Style {
  _strokeColor: string = ''
  _edgeStyle: string = ''
  _fillColor: string = ''

  constructor({strokeColor, edgeStyle, fillColor}: IStyleArgs) {
    this.strokeColor = strokeColor
    this.edgeStyle = edgeStyle
    this.fillColor = fillColor
  }

  set strokeColor(color: string) {
    this._strokeColor = color
  }

  get strokeColor() {
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