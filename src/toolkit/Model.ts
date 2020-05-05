const createGetStyleCollapsed = (model, collapsedStyle) => (cell) => {
    var modelGetStyle = model.getStyle;  
    if (cell != null)
    {
      var style = modelGetStyle.call(cell);
      
      if (model.isCollapsed(cell)) {
        style = style + ';' + collapsedStyle
      }
      
      return style;
    }
    
    return null;
  };


export class Model {
  model: any

  setCellStyle(style: string) {
    this.model.getStyle = createGetStyleCollapsed(this.model, style)
  }
}
