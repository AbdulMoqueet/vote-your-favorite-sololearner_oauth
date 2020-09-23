import React from "react";
import { ToastContainer } from "react-toastify";
import Home from "./routes/Home/Home";
import Loader from "./components/loader/Loader";
import Footer from "./components/footer/Footer";
import { AppContextProvider } from "./context/AppContext";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  return (
    <AppContextProvider>
      <div className="App">
        <Router>
          <ToastContainer />
          <Loader />
          <Switch>

            <Route path="/" exact render={(props) => <Home {...props} />} />

          </Switch>
          <Footer />
        </Router>
      </div>
    </AppContextProvider>
  );
}

export default App;
