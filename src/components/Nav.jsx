import { useState } from 'preact/hooks';

const Nav = () => {
  const [isActive, setActive] = useState(false);

  const toggleMenu = () => {
    setActive(!isActive);
  };

  return (
    <div className="navbar is-dark-green">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <img alt="site logo" src="logo.png" width="45px" />
          </div>
          <button
            className="navbar-burger has-text-white"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div className={`navbar-menu ${isActive ? 'is-active' : null}`}>
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/pitches" className="navbar-item">
              Pitches
            </a>
            <a href="/resources" className="navbar-item">
              Resources
            </a>
            <a href="/about" className="navbar-item">
              About
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
