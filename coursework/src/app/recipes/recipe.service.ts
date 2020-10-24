import { Injectable } from '@angular/core';

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    // TODO: Remove mock data
    private recipes: Array<Recipe> = [
        {
            name: 'Test Fondue',
            description: 'A delicious, testy treat!',
            imageUrl: 'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png',
            ingredients: [
                {
                    name: 'Whatever is in Fondue',
                    amount: 1
                }
            ]
        },
        {
            name: '10oz Test Steak',
            description: 'Warning: May not be beef!',
            imageUrl: 'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png',
            ingredients: [
                {
                    name: 'Mystery Beef',
                    amount: 1
                },
                {
                    name: 'Baked Potato',
                    amount: 1
                }
            ]
        }
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes(): Array<Recipe> {
        return Array.from(this.recipes);
    }

    getRecipe(index: number) {
        return this.getRecipes()[index];
    }

    addRecipeToShoppingList(recipe: Recipe) {
        this.shoppingListService.addIngredients(recipe.ingredients);
    }
}
