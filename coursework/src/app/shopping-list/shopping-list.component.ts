import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    shoppingList: Array<Ingredient> = [];

    private ingredientChangeSubscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
        this.shoppingList = this.shoppingListService.getShoppingList();

        this.ingredientChangeSubscription = this.shoppingListService.ingredientsChanged
            .subscribe((newShoppingList: Array<Ingredient>) => {
                this.shoppingList = newShoppingList;
            });
    }

    ngOnDestroy(): void {
        this.ingredientChangeSubscription.unsubscribe();
    }
}
