# Graph events

- `addMouseListener` Adds a listener to the graph event dispatch loop.
- `removeMouseListener` Removes the specified graph listener.
- `updateMouseEvent` Sets the graphX and graphY properties if the given mxMouseEvent if required and returned the event.
- `getStateForEvent` Returns the state for the given touch event.
- `isEventIgnored` Returns true if the event should be ignored in fireMouseEvent.
- `isSyntheticEventIgnored`	Hook for ignoring synthetic mouse events after touchend in Firefox.
- `isEventSourceIgnored` Returns true if the event should be ignored in fireMouseEvent.
- `getEventState` Returns the mxCellState to be used when firing the mouse event for the given state.
- `fireMouseEvent` Dispatches the given event in the graph event dispatch loop.
- `consumeMouseEvent` Consumes the given mxMouseEvent if it’s a touchStart event.
- `fireGestureEvent` Dispatches a mxEvent.GESTURE event.
- `destroy` Destroys the graph and all its resources.