import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    listOfRecipes: Array<Recipe> = [];

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.listOfRecipes = this.recipeService.getRecipes();
    }

    handleNewRecipe() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }
}
