import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;

    constructor (
        private recipeService: RecipeService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => {
                const id = Number.parseInt(params['id']);
                this.recipe = this.recipeService.getRecipe(id);
            })
    }

    handleAddToShoppingList(recipe: Recipe) {
        this.recipeService.addRecipeToShoppingList(recipe);
    }
}
