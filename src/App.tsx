import React from 'react';
import './App.css';
import Categories from './components/categories/Categories';
import Recipes from './components/recipes/Recipes';

function App() {
  return (
    <div className="App">
      <Categories />
      <Recipes />
    </div>
  );
}

export default App;
