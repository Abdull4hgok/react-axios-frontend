import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Products from './Components/Products';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Register from './Components/Register';
import { useState, useEffect } from 'react';
import { getToken } from "./Components/Auth"

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-1">
            <Products />
          </div>
          {loggedIn ? (
            <div className="col-md-8">
              <Logout onLogout={handleLogout} />
            </div>
          ) : (
            <>
              <div className="col-md-1">
                <Login onLogin={handleLogin} />
              </div>
              <div className="col-md-8">

                  <div className="col-md-1">
                    <Register />
                  </div>

              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
