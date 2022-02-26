import { formatDistance } from 'date-fns';
import React from 'react';
import { Card } from 'react-bootstrap';
import { IRecipe } from '../../models/IRecipe';

interface IProps {
  recipe: IRecipe;
}

const Recipe: React.FC<IProps> = ({ recipe }: IProps) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img src={recipe.photo} variant="top" className="img-fluid"></Card.Img>
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Card.Text>{formatDistance(recipe.createdAt, new Date(), { addSuffix: true })}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Recipe;
