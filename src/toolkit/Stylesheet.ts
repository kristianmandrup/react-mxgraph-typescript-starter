import { mxgraphFactory } from "ts-mxgraph";

const { mxConstants } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export const styleMap = {
  rounded: mxConstants.STYLE_ROUNDED,
  fillColor: mxConstants.STYLE_FILLCOLOR,
  strokeColor: mxConstants.STYLE_STROKECOLOR,
  strokeWidth: mxConstants.STYLE_STROKEWIDTH,
  fontColor: mxConstants.STYLE_FONTCOLOR,
  fontSize: mxConstants.STYLE_FONTSIZE,
  fontStyle: mxConstants.STYLE_FONTSTYLE  
}

export class StyleSheet {
  stylesheet: any

  constructor(stylesheet: any) {
    this.stylesheet = stylesheet
  }

  get defaultVertexStyle(): any {
    return this.stylesheet.getDefaultVertexStyle()
  }

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
