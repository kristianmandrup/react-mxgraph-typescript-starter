import mx from "./mx";
const { mxEvent, mxUtils, mxGraph } = mx

export interface IRegionCalc {
  determine(point: any): string
}

export class RegionCalc implements IRegionCalc {
  state: any

  constructor(state: any) {
    this.state = state
  }

  inSecondHalf(point) {
    return point.y > this.state.height / 2
  }

  determine(point: any): string {
    return this.inSecondHalf(point) ? 'second' : 'first'
  }
}

const createRow = (cell, {textAlign, fontSize, color, getLabel}) => {
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.style.textAlign = textAlign || 'center';
  td.style.fontSize = fontSize || '12px';
  td.style.color = color || '#774400';
  mxUtils.write(td, getLabel(cell.value));
  tr.appendChild(td);
  return tr
}

// TODO: refactor and generalise
export const getLabel = ({textAlign, fontSize, color, getLabels}) => (cell) => {
  var table = document.createElement('table');
  table.style.height = '100%';
  table.style.width = '100%';
  
  var body = document.createElement('tbody');

  getLabels = getLabels || {
    first: (value) => value.first,
    second: (value) => value.second
  }

  const tr1 = createRow(cell, {textAlign, fontSize, color, getLabel: getLabels.first })
  const tr2 = createRow(cell, {textAlign, fontSize, color, getLabel: getLabels.second })
    
  body.appendChild(tr1);
  body.appendChild(tr2);
  
  table.appendChild(body);
  
  return table;
};

export const getEditingValue = getFieldnameForEvent => (cell, evt) => {
  evt.fieldname = getFieldnameForEvent(cell, evt);

  return cell.value[evt.fieldname] || '';
};
								
				// Sets the new value for the given cell and trigger
export const labelChanged = (cell, newValue, trigger) => {
  var name = (trigger != null) ? trigger.fieldname : null;
  
  if (name != null)
  {
    // Clones the user object for correct undo and puts
    // the new value in the correct field.
    var value = mxUtils.clone(cell.value);
    value[name] = newValue;
    newValue = value;
    
    mxGraph.prototype.labelChanged(cell, newValue, trigger);
  }
};

export class Editing {
  graph: any
  defaultRegionName: string = 'default'

  constructor(graph: any, {defaultRegionName}: any) {
    this.graph = graph
    this.defaultRegionName = defaultRegionName || this.defaultRegionName
  }

  calcPoint(evt) {
    return mxUtils.convertPoint(this.graph.container, mxEvent.getClientX(evt), mxEvent.getClientY(evt));
  }

  createRegionCalc(state): IRegionCalc {
    return new RegionCalc(state)
  }
  
  // Helper method that returns the fieldname to be used for
  // a mouse event
  getFieldnameForEvent(cell, evt) {
    if (evt === null) return 'default'
    
    // Finds the relative coordinates inside the cell
    var point = this.calcPoint(evt)
    var state = this.graph.getView().getState(cell);
    const regionCalc = this.createRegionCalc(state)
    
    if (state != null) {
      point.x -= state.x;
      point.y -= state.y;
      
      // Returns second if mouse in second half of cell
      return regionCalc.determine(point)
    }
  };  
}