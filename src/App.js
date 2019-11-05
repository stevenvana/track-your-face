import React from "react";
import { StylesProvider } from "@material-ui/core/styles";
import SimpleTabs from "./SimpleTabs";

function App() {
  return (
    <div style={{ background: "#3f50b5", height: "100vh" }}>
      <StylesProvider injectFirst>
        <SimpleTabs />
      </StylesProvider>
    </div>
  );
}

export default App;
