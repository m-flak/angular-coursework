import { Ingredient } from '../shared/ingredient.model';

export interface Recipe {
    name: string;
    description: string;
    imageUrl: string;
    ingredients: Array<Ingredient>;
}
