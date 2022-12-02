import './App.css';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import React, { useEffect } from 'react';

import { Home } from './Components/Home';
import { Authenticate } from './Components/Authenticate';
import { Users } from './Components/Users';
import { userAuthenticationStatusContainer } from './services/user-status';
import { Register } from './Components/Register';

const App = () => {

  const { isAuthenticated, email, LogOut } = userAuthenticationStatusContainer();

  useEffect(() => {
  }, []) // empty array indicates that it is executed once

  const handleClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      alert(`User not logged on! Access forbiden`)
    }
  }

  return (
    <BrowserRouter>
      <div className="App container">

        <div className="row">

          <div className="col-sm">
            <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
              <ul className='navbar-nav'>
                <li className='nav-item- m-1'>
                  <NavLink className='btn btn-light btn-outline-primary' to='/home'>
                    Home
                  </NavLink>
                </li>
                <li className='nav-item- m-1'>
                  <NavLink className='btn btn-light btn-outline-primary' to='/authenticate'>
                    Authenticate
                  </NavLink>
                </li>
                <li className='nav-item- m-1'>
                  <NavLink className='btn btn-light btn-outline-primary' onClick={handleClick} to='/users'>
                    Users
                  </NavLink>
                </li>
                <li className='nav-item- m-1'>
                  <NavLink className='btn btn-light btn-outline-primary' to='/register'>
                    Registration
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-sm">
            <h3 className='d-flex justify-content-center m-2'>
              Logged user: {isAuthenticated ? email : 'no-one'}
            </h3>
          </div>
          {isAuthenticated ?
            <div className="col-sm-2">
              <button type="button" className='btn btn-primary m-2' onClick={LogOut}>
                LogOut
              </button>
            </div>
            : null}

        </div>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/authenticate' element={<Authenticate />} />
          <Route path='/users' element={<Users />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      </div>
    </BrowserRouter>
  );

}

export default App;
