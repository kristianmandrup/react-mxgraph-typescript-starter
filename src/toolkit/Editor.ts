import mx from "./mx";
const { mxEditor } = mx

const getElem = (id) => document.getElementById(id)

export class Editor {
  editor: any
  containers: any

  constructor(graph: any) {
    const editor = new mxEditor();
    this.editor = editor
    this.editor.graph = graph
  }

  createContainers() {
    this.containers = {
      graph: getElem('graphContainer'),
      outline: getElem('outlineContainer'),
      toolbar: getElem('toolbarContainer'),
      sidebar: getElem('sidebarContainer'),
      status: getElem('statusContainer')
    }    
  }

  get graph(): any {
    return this.editor.graph;
  }

  set defaultGroup(group) {
    this.editor.defaultGroup = group
  }

  configure(config) {
    this.editor.configure(config)
  }
}
