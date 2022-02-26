import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Categories from './components/categories/Categories';
import Recipes from './components/recipes/Recipes';

function App() {
  return (
    <>
      <header>
        <h1>SmartFood</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
        </ul>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
