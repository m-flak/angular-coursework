import { Component, OnInit, Input } from '@angular/core';

import { DropdownHandler } from '../../shared/dropdown-handler.class';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent extends DropdownHandler implements OnInit {
    @Input('recipeData') recipe: Recipe;

    constructor() {
        super('recipe-detail-dropdown');
    }

    ngOnInit(): void {
    }

    handleOutsideDropdownClick(e: any) {
        return this._handleOutsideDropdownClick(e);
    }
}
