import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';
import Home from './pages/Home';
import Resources from './pages/Resources';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/resources" element={<Resources />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
