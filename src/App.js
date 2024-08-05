import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetProductByCategory from './components/CategorySearchSort';
import Cart from './components/Cart';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<GetProductByCategory />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Cart" element={<Cart />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;

// for small spaces:
// <span class="spanen">&nbsp;</span>

