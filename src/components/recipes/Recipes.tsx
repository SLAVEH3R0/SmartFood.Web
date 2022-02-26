import React, { useEffect, useState } from 'react';
import { IRecipe } from '../../models/IRecipe';
import api from '../../services/api';
import Recipe from '././Recipe';

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Array<IRecipe>>([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    await api
      .get('/recipes')
      .then((response) => {
        const data = response.data.map((recipes: IRecipe) => ({
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

      {recipes.map((recipe: IRecipe) => (
        <div key={recipe.id}>
          <Recipe recipe={recipe} />
        </div>
      ))}
    </div>
  );
};

export default Recipes;
