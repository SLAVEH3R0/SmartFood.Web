import { Category } from './Category';

export interface Recipe {
  id: string;
  name: string;
  preparationTime: number;
  servings: number;
  ingredients: string;
  description: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}
