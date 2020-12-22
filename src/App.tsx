import React, { useState } from "react";
import { Provider } from "react-redux";
import "./App.scss";
import Header from "./components/header/Header";
import { store } from "./redux/store/store";
import Routes from "./routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/footer/Footer";

interface IProps {}

const App: React.FC<IProps> = () => {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <div className = 'header-wrapper'>
          <Header />
          </div>
          <Routes />
          <div className = 'footer-wrapper'>
            <Footer/>
          </div>
        </Provider>
      </Router>
    </div>
  );
};

export default App;
