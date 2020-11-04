import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    listOfRecipes: Array<Recipe> = [];
    recipeChangeSubscription: Subscription;

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.listOfRecipes = this.recipeService.getRecipes();

        this.recipeChangeSubscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
            this.listOfRecipes = recipes;
        });
    }

    ngOnDestroy(): void {
        this.recipeChangeSubscription.unsubscribe();
    }

    handleNewRecipe() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }
}
