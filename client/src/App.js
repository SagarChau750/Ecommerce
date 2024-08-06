
import React from "react";
import "./index"
import Header from "./components/header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./components/MainPage/Pages";
import { DataProvider } from "./GlobalState";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
