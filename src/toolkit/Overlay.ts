import { mxgraphFactory } from "ts-mxgraph";
import { ISize } from './types';

const { mxCellOverlay, mxImage, mxEvent } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export const createImageOverlay = (imagePath: string, size: ISize, {label, cursor}: {label: string, cursor: string}) {
  // Creates a new overlay with an image and a tooltip
  var overlay = new mxCellOverlay(new mxImage(imagePath, size.width, size.height), label)
  overlay.cursor = 'hand'
  if (cursor) {
    overlay.cursor = cursor
  }    
}  

const eventTypeMap = {
  click: mxEvent.CLICK
}

export class Overlay {
  overlay: any

  constructor(overlay: any) {
    this.overlay = overlay
  }

  addListener(type: string, onTriggerFn) {
    type = eventTypeMap[type] || type
    this.overlay.addListener(type, onTriggerFn)
  }
}