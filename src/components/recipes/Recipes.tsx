import React, { useEffect, useState } from 'react';
import { Recipe } from '../../models/Recipe';
import api from '../../services/api';

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    await api
      .get('/recipes')
      .then((response) => {
        const data = response.data.map((recipes: Recipe) => ({
          ...recipes,
          createdAt: new Date(recipes.createdAt),
          updatedAt: new Date(recipes.updatedAt),
        }));
        setRecipes(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Recipes</h1>

      {recipes.map((recipe: Recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
          <p>{recipe.createdAt.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Recipes;
