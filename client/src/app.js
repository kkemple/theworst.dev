/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Router } from "@reach/router";

import Chat from "./overlays/chat";

function App() {
  return (
    <Router css={{ width: "100vw", height: "100vh" }}>
      <Chat path="/chat" />
    </Router>
  );
}

export default App;
