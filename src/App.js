import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetProductByCategory from './components/CategorySearchSort';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<GetProductByCategory />} />
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

