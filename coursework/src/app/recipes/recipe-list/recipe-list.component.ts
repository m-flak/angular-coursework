import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    listOfRecipes: Array<Recipe> = [];

    constructor(private recipeService: RecipeService) { }

    ngOnInit(): void {
        this.listOfRecipes = this.recipeService.getRecipes();

        // Show details for first recipe
        if (this.listOfRecipes.length > 0) {
            this.recipeService.recipeSelected.emit(this.listOfRecipes[0]);
        }
    }

    handleRecipeItemClick(recipe: Recipe) {
        this.recipeService.recipeSelected.emit(recipe);
    }
}
