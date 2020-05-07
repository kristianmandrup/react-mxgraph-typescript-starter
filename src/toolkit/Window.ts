import mx from "./mx";
import { IPosition, ISize } from './types';
const { mxWindow } = mx

export class Window {
  graph: any
  container: Element
  window: any

  constructor(graph: any, container: Element) {
    this.graph = graph
    this.container = container
  }

  get defaultPos(): IPosition {
    return {
      x: 200,
      y: 100
    }
  }

  get defaultSize(): ISize {
    return {
      width: 400,
      height: 200
    }
  }

  create(title: string, {pos, size, minimizable, movable}: {pos?: IPosition, size?: ISize, minimizable?: boolean, movable?: boolean} = {minimizable: true, movable: true}) {
    const { container, defaultPos, defaultSize } = this
    pos = {
      ...defaultPos,
      ...pos      
    }
    size = {
      ...defaultSize,
      ...pos      
    }
    const { x, y } = pos
    const { width, height } = size
    this.window = new mxWindow(title, container, x, y, width, height, minimizable, movable);
  }

  setMaximizable(value: boolean) {
    this.window.setMaximizable(true);
  }

  setResizable(value: boolean) {
    this.window.setResizable(true);
  }

  setScrollable(value: boolean) {
    this.window.setScrollable(true);
  }

  setVisible(value: boolean) {
    this.window.setVisible(true);
  }
}
