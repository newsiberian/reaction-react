import React from "react";
import { createDevTools } from "redux-devtools";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";

export default createDevTools(
  <DockMonitor
    defaultPosition="bottom"
    defaultIsVisible={false}
    changePositionKey="ctrl-b"
    toggleVisibilityKey="ctrl-h"
  >
    <LogMonitor />
  </DockMonitor>
);
