import React, { useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Home from "./routes/Home/Home";
import Loader from "./components/loader/Loader";
import Footer from "./components/footer/Footer";
import { AppContext } from "./context/AppContext";
axios.defaults.withCredentials = true;

function App() {

  const [appContext, setAppContext] = useContext(AppContext);

  useEffect(() => {

    setAppContext({ ...appContext, isLoading: true });

    setTimeout(() => {
      axios
        .get('/api/user')
        .then(res => {
          setAppContext({ ...appContext, isLoading: false, isLogin: true })
        })
        .catch(err => {
          console.log(err);
          setAppContext({ ...appContext, isLoading: false, isLogin: false })
        });
    }, 100);

  }, []);


  return (

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
  );
}

export default App;
