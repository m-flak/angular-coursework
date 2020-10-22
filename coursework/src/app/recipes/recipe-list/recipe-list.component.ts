import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    //TODO: Remove mock data
    listOfRecipes: Array<Recipe> = [
        {
            name: 'Test Fondue',
            description: 'A delicious, testy treat!',
            imageUrl: 'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png'
        },
        {
            name: '10oz Test Steak',
            description: 'Warning: May not be beef!',
            imageUrl: 'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png'
        }
    ];

    @Output() recipeChanged: EventEmitter<Recipe> = new EventEmitter<Recipe>();

    constructor() { }

    ngOnInit(): void {
        // Show details for first recipe
        if (this.listOfRecipes.length > 0) {
            this.recipeChanged.emit(this.listOfRecipes[0]);
        }
    }

    handleRecipeItemClick(recipe: Recipe) {
        this.recipeChanged.emit(recipe);
    }
}
