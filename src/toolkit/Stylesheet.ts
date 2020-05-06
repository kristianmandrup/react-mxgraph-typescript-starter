import mx from "./mx";
const { mxConstants } = mx

export const shapeMap = {
  rectangle: mxConstants.SHAPE_RECTANGLE
}

export const alignMap = {
  left: mxConstants.ALIGN_LEFT,
  center: mxConstants.ALIGN_CENTER,
  right: mxConstants.ALIGN_LEFT  
}

export const verticalAlignMap = {
  top: mxConstants.ALIGN_TOP,
  middle: mxConstants.ALIGN_MIDDLE,
  bottom: mxConstants.ALIGN_BOTTOM
}  


export const styleMap = {
  rounded: mxConstants.STYLE_ROUNDED,
  fillColor: mxConstants.STYLE_FILLCOLOR,
  strokeColor: mxConstants.STYLE_STROKECOLOR,
  strokeWidth: mxConstants.STYLE_STROKEWIDTH,
  fontColor: mxConstants.STYLE_FONTCOLOR,
  fontSize: mxConstants.STYLE_FONTSIZE,
  fontStyle: mxConstants.STYLE_FONTSTYLE,
  shape: mxConstants.STYLE_SHAPE,
  perimeter: mxConstants.STYLE_PERIMETER,
  align: mxConstants.STYLE_ALIGN,
  verticalAlign: mxConstants.STYLE_VERTICAL_ALIGN,
  gradientColor: mxConstants.STYLE_GRADIENTCOLOR,
  opacity: mxConstants.STYLE_OPACITY,
  imageWidth: mxConstants.STYLE_IMAGE_WIDTH,
  imageHeight: mxConstants.STYLE_IMAGE_HEIGHT,
  imageBackground: mxConstants.STYLE_IMAGE_BACKGROUND,
  imageAlign: mxConstants.STYLE_IMAGE_ALIGN,
  imageVerticalAlign: mxConstants.STYLE_IMAGE_VERTICAL_ALIGN,
  spacingTop: mxConstants.STYLE_SPACING_TOP,
  image: mxConstants.STYLE_IMAGE,
  labelBackgroundColor: mxConstants.STYLE_LABEL_BACKGROUNDCOLOR,
  edge: mxConstants.STYLE_EDGE,  
  shadow: mxConstants.STYLE_SHADOW,
  indicatorShape: mxConstants.STYLE_INDICATOR_SHAPE,
  indicatorWidth: mxConstants.STYLE_INDICATOR_WIDTH,
  indicatorHeight: mxConstants.STYLE_INDICATOR_HEIGHT,
  indicatorColor: mxConstants.STYLE_INDICATOR_COLOR
}

export class StyleSheet {
  stylesheet: any

  constructor(stylesheet: any) {
    this.stylesheet = stylesheet
  }

  get defaultVertexStyle(): any {
    return this.stylesheet.getDefaultVertexStyle()
  }

  // indicatorShape=actor;indicatorWidth=28;indicatorColor=blue

  // Usage:
  // setVertexStyle({
  //   rounded: true,
  //   fillColor: '#ffffff'
  // })
  setVertexStyle(styles) {
    const vstyle = this.defaultVertexStyle
    Object.keys(styles).map(name => {
      const key = styleMap[name]
      vstyle[key] = styles[name]
      return key
    })
    this.putDefaultVertexStyle(vstyle)  
  }

  putDefaultVertexStyle(style) {
    this.stylesheet.putDefaultVertexStyle(style)
  };

  get defaultEdgeStyle(): any {
    return this.stylesheet.getDefaultEdgeStyle()
  }

  setDefaultEdgeStyle(style: string) {
    this.defaultEdgeStyle['edgeStyle'] = 'orthogonalEdgeStyle';
  }  
}
