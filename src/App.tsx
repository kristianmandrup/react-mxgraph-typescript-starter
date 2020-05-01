import React, { useEffect, useRef } from "react";
import { mxGraph, mxRubberband, mxClient, mxUtils, mxEvent } from "mxgraph-js";

const App: React.FC = () => {
  const divGraph = useRef(null);

  useEffect(() => {
    if (!mxClient.isBrowserSupported()) {
      mxUtils.error("Browser is not supported!", 200, false);
    } else {
      mxEvent.disableContextMenu(divGraph.current);
      const graph = new mxGraph(divGraph.current);
      new mxRubberband(graph);
      const parent = graph.getDefaultParent();
      graph.getModel().beginUpdate();

      try {
        const v1 = graph.insertVertex(parent, null, "Hello,", 20, 20, 80, 30);
        const v2 = graph.insertVertex(parent, null, "World!", 200, 150, 80, 30);
        const e1 = graph.insertEdge(parent, null, "", v1, v2);
      } finally {
        graph.getModel().endUpdate();
      }
    }
  });

  return <div className="graph-container" ref={divGraph} id="divGraph" />;
};

export default App;