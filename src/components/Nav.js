import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="navbar is-dark-green">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <img alt="site logo" src="logo.png" width="45px" />
          </div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/pitches" className="navbar-item">
              Pitches
            </Link>
            <Link to="/resources" className="navbar-item">
              Resources
            </Link>
            <Link to="/about" className="navbar-item">
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
