import React from "react";
import Calculator from "./Components/calculator/Calculator";
import "./App.css";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux";
const store = configureStore();
function App() {
  return (
    <div>
      <ReduxProvider store={store}>
        <Calculator />
      </ReduxProvider>
    </div>
  );
}

export default App;
