import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
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
    <>
      <h1>Recipes</h1>
      <Row>
        {recipes.map((recipe: IRecipe) => (
          <Col xs={12} md={3} key={recipe.id}>
            <Recipe recipe={recipe} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Recipes;
