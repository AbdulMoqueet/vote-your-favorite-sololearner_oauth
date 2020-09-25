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
      console.log(process.env.REACT_APP_API_URL);
      axios
        .get('api/user')
        .then(res => {
          console.log(res);
          setAppContext({ ...appContext, isLoading: false, isLogin: true })
        })
        .catch(err => {
          console.log('catch block');
          console.log(err.response);
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
