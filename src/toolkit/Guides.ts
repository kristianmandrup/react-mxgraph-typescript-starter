import mx from "./mx";
const { mxConstants, mxEvent, mxGraphHandler } = mx

export class Guides {
  handler: any

  constructor() {
    this.handler = mxGraphHandler.prototype
  }

  init() {
    // Enables guides
    this.handler.guidesEnabled = true
    this.handler.useGuidesForEvent = this.useGuidesForEvent
    this.snapToTerminals()
    return this
  }

  snapToTerminals() {
    // Enables snapping waypoints to terminals
    this.handler.snapToTerminals = true;  
  }

  initStyle() {
    // Defines the guides to be red (default)
    mxConstants.GUIDE_COLOR = '#FF0000';
    
    // Defines the guides to be 1 pixel (default)
    mxConstants.GUIDE_STROKEWIDTH = 1;
  
  }
								
  // Alt disables guides
  useGuidesForEvent(me) {
    return !mxEvent.isAltDown(me.getEvent());
  }			    
}