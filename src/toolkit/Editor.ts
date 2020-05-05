import { mxgraphFactory } from "ts-mxgraph";

const { mxEditor } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

const getElem = (id) => document.getElementById(id),

export class Editor {
  editor: any
  containers: any

  constructor() {
    const editor = new mxEditor();
    this.editor = editor
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

  group(cell) {
    const { editor } = this
    cell = cell || editor.graph.getSelectionCell();
    if (cell != null && editor.graph.isSwimlane(cell))
    {
      editor.execute('ungroup', cell);
    }
    else
    {
      editor.execute('group');
    }
  }
}
