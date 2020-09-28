import React, { useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Home from "./routes/Home/Home";
import Details from "./routes/Details/Details";
import Loader from "./components/loader/Loader";
import Footer from "./components/footer/Footer";
import { AppContext } from "./context/AppContext";
axios.defaults.withCredentials = true;

function App() {

  const [appContext, setAppContext] = useContext(AppContext);

  useEffect(() => {

    setAppContext({ ...appContext, isLoading: true });

    axios
      .get('/api/user')
      .then(res => {
        setAppContext({ ...appContext, isLoading: false, isLogin: true, user: res.data.user })
      })
      .catch(err => {
        setAppContext({ ...appContext, isLoading: false, isLogin: false })
      });

  }, []);


  return (

    <div className="App">
      <Router>
        <ToastContainer />
        <Loader />
        <Switch>

          <Route path="/" exact>
            <Home />
            <Footer />
          </Route>

          <Route
              path="/details/:_id" exact
              render={(props) => <Details {...props} />} />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
