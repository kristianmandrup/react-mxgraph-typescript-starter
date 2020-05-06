import { mxgraphFactory } from "ts-mxgraph";

const { mxPolyline, mxConnectionConstraint, mxPoint, mxShape } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

const ac = (x, y) => {
  return new mxConnectionConstraint(new mxPoint(x, y), true)
}

export class Anchor {
  static createContraint(x, y) {
    return ac(x, y)
  }

  // apply for all shapes   
  setShapeConstraints(constraints) {
    mxShape.prototype['constraints'] = constraints
  }

  // edges normally have no anchor constraints  
  disableEdgeConstraints() {
    mxPolyline.prototype['constraints'] = null;
  }
}

export class AnchorPositions {
  north = [
    ac(0.25, 0),
    ac(0.5, 0),
    ac(0.75, 0)
  ]

  west = [
    ac(0, 0.25),
    ac(0, 0.5),
    ac(0, 0.75)
  ]

  east = [
    ac(1, 0.25),
    ac(1, 0.5),
    ac(1, 0.75)
  ]

  south = [
    ac(0.25, 1),
    ac(0.5, 1),
    ac(0.75, 1)
  ]

  directions = {
    north: this.north

  }

  constraintsFor(direction: string, count: number): any[] {
    const c = this.directions[direction]
    if (count === 1) return [c[1]]
    if (count === 2) return [c[0], c[2] ]
    return c
  }

  constraintsForDirections(directions: string[], count: number): {} {
    return directions.reduce((acc, direction) => {
      acc[direction] = this.constraintsFor(direction, count)
      return acc
    }, {})
  }

  allConstraintsFor(count: number): {} {
    return this.constraintsForDirections(['north', 'east', 'west', 'south'], count)
  }
}
