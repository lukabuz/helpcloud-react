import React, { useState, useEffect } from "react";
import "./App.css";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { useToasts } from "react-toast-notifications";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Voulenteer from "./Components/Voulenteer";
import Main from "./Components/Main";
import Landing from "./Components/Landing";
import "antd/dist/antd.css";
import { getReasons } from "./Utils/ApiUtil";

function App() {
  const { addToast } = useToasts();
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [reasons, setReasons] = useState([]);

  const handleMenuClose = () => {
    setIsMenuToggled(false);
  };

  useEffect(() => {
    getReasons()
      .then(res => setReasons(res))
      .catch(e => e.forEach(error => addToast(error, { appearance: "error" })));

    return () => {};
  }, []);

  return (
    <Router>
      <header className="navbar">
        <div className="container--lg">
          <div className="navbar__menu">
            <div className="navbar__menu__hamburger">
              <MenuIcon onClick={() => setIsMenuToggled(true)} />
            </div>
            <div className={`navbar__menu__items ${isMenuToggled && "active"}`}>
              <div className="navbar__menu__item">
                <div className="navbar__menu__hamburger">
                  <CloseIcon onClick={handleMenuClose} />
                </div>
              </div>
              <Link
                to="/"
                className="navbar__menu__item"
                onClick={handleMenuClose}
              >
                Home
              </Link>
              <Link
                to="/listings"
                className="navbar__menu__item"
                onClick={handleMenuClose}
              >
                Listings
              </Link>
              <Link
                to="/volunteer"
                className="navbar__menu__item"
                onClick={handleMenuClose}
              >
                Volunteer
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="container--lg">
          <div className="main-content">
            <Switch>
              <Route path="/volunteer" exact>
                <Voulenteer reasons={reasons} />
              </Route>
              <Route path="/listings">
                <Main reasons={reasons} />
              </Route>

              <Route path="/">
                <Landing />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </Router>
  );
}

export default App;
