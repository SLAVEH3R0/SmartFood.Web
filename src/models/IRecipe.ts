import { ICategory } from './ICategory';

export interface IRecipe {
  id: string;
  name: string;
  preparationTime: number;
  servings: number;
  ingredients: string;
  description: string;
  category: ICategory;
  createdAt: Date;
  updatedAt: Date;
}
