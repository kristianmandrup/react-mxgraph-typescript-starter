# mxSwimlaneManager

Manager for swimlanes and nested swimlanes that sets the size of newly added swimlanes to that of their siblings, and propagates changes to the size of a swimlane to its siblings, if `siblings` is true, and its ancestors, if `bubbling` is true.