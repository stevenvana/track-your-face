import React from "react";
import { StylesProvider } from '@material-ui/core/styles';
import SimpleTabs from "./SimpleTabs";

function App() {
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <SimpleTabs />
      </StylesProvider>
    </div>
  );
}

export default App;
