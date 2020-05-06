import { ISize } from './types';
import { mxgraphFactory } from "ts-mxgraph";

const { mxConstants, mxPoint, mxConnectionConstraint, mxConstraintHandler, mxImage, mxShape } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

interface IPorts {
  setPorts()
}

export class BasePorts {
  // ... except for triangles
  ports = new Array();

  setShapePorts() {
    // Extends shapes classes to return their ports
    mxShape.prototype['getPorts'] = () => this.ports
  }
}

// Ports are equal for all shapes...  
export class ShapePorts extends BasePorts {  
  setPorts() {
    const { ports } = this
    // NOTE: Constraint is used later for orthogonal edge routing (currently ignored)
    ports['w'] = {x: 0, y: 0.5, perimeter: true, constraint: 'west'};
    ports['e'] = {x: 1, y: 0.5, perimeter: true, constraint: 'east'};
    ports['n'] = {x: 0.5, y: 0, perimeter: true, constraint: 'north'};
    ports['s'] = {x: 0.5, y: 1, perimeter: true, constraint: 'south'};
    ports['nw'] = {x: 0, y: 0, perimeter: true, constraint: 'north west'};
    ports['ne'] = {x: 1, y: 0, perimeter: true, constraint: 'north east'};
    ports['sw'] = {x: 0, y: 1, perimeter: true, constraint: 'south west'};
    ports['se'] = {x: 1, y: 1, perimeter: true, constraint: 'south east'};
  }
}

  // ... except for triangles
export class TrianglePorts extends BasePorts implements IPorts {
  ports = new Array();

  setPorts() {
    this.inPorts()
    this.outPorts()
  }

  inPorts() {
    const { ports } = this
    // NOTE: Constraint is used later for orthogonal edge routing (currently ignored)
    ports['in1'] = {x: 0, y: 0, perimeter: true, constraint: 'west'};
    ports['in2'] = {x: 0, y: 0.25, perimeter: true, constraint: 'west'};
    ports['in3'] = {x: 0, y: 0.5, perimeter: true, constraint: 'west'};
    ports['in4'] = {x: 0, y: 0.75, perimeter: true, constraint: 'west'};
    ports['in5'] = {x: 0, y: 1, perimeter: true, constraint: 'west'};
  }

  outPorts() {
    const { ports } = this
    ports['out1'] = {x: 0.5, y: 0, perimeter: true, constraint: 'north east'};
    ports['out2'] = {x: 1, y: 0.5, perimeter: true, constraint: 'east'};
    ports['out3'] = {x: 0.5, y: 1, perimeter: true, constraint: 'south east'};  
  }  
}

export class Ports {
  graph: any
  handler: any // mxConstraintHandler.prototype

  constructor(graph: any) {
    this.graph = graph
    this.handler = mxConstraintHandler.prototype
  }


  setPointImageByProps(imagePath: string, size: ISize) {
    mxConstraintHandler.prototype.pointImage = new mxImage(imagePath, size.width, size.height);
  }  

  setPointImage(image: any) {
    mxConstraintHandler.prototype.pointImage = image
  }  

  setConnectionPort() {
    const { graph } = this
    // Sets the port for the given connection
    graph.setConnectionConstraint = (edge, terminal, source, constraint) {
      if (constraint != null) {
        const key = (source) ? mxConstants.STYLE_SOURCE_PORT : mxConstants.STYLE_TARGET_PORT;        
        if (constraint == null || constraint.id == null) {
          graph.setCellStyles(key, null, [edge]);
        }
        else if (constraint.id != null) {
          graph.setCellStyles(key, constraint.id, [edge]);
        }
      }
    };
  }

  portForConnection() {
    // Returns the port for the given connection
    this.graph.getConnectionConstraint = (edge, terminal, source) => {
      const key = (source) ? mxConstants.STYLE_SOURCE_PORT : mxConstants.STYLE_TARGET_PORT;
      const id = edge.style[key];
      
      if (id != null) {
        var c =  new mxConnectionConstraint(undefined, undefined);
        c['id'] = id;        
        return c;
      }      
      return null;
    };
  }
			
  portConnectionPoint() {
    // Returns the actual point for a port by redirecting the constraint to the port
    const graphGetConnectionPoint = this.graph.getConnectionPoint;
    this.graph.getConnectionPoint = (vertex, constraint) => {
      if (constraint.id != null && vertex != null && vertex.shape != null) {
        const port = vertex.shape.getPorts()[constraint.id];        
        if (port != null) {
          constraint = new mxConnectionConstraint(new mxPoint(port.x, port.y), port.perimeter);
        }
      }      
      return graphGetConnectionPoint.apply(this, arguments);
    };  
  }

  disableDefaultPortFunctionality() {
    // Disables existing port functionality
    this.graph.view.getTerminalPort = (state, terminal, source) => {
      return terminal;
    };
  }
  
  setupRetrieveTerminalPorts() {
  const { graph } = this
  // Returns all possible ports for a given terminal
  graph.getAllConnectionConstraints = (terminal, source) => {
    if (terminal != null && terminal.shape != null &&
      terminal.shape.stencil != null) {
      // for stencils with existing constraints...
      if (terminal.shape.stencil != null) {
        return terminal.shape.stencil.constraints;
      }
    }
    else if (terminal != null && graph.model.isVertex(terminal.cell)) {
      if (terminal.shape != null) {
        var ports = terminal.shape.getPorts();
        var cstrs = new Array();
        
        for (var id in ports)
        {
          var port = ports[id];
          
          var cstr = new mxConnectionConstraint(new mxPoint(port.x, port.y), port.perimeter);
          cstr['id'] = id;
          cstrs.push(cstr);
        }
        
        return cstrs;
      }
    }
    
    return null;
  };  
  }
}
