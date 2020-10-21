import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
    // TODO: Remove mock data
    shoppingList: Array<Ingredient> = [
        {
            name: 'Apples',
            amount: 5
        },
        {
            name: 'Oranges',
            amount: 5
        }
    ];

    constructor() { }

    ngOnInit(): void {
    }

    handleIngredientAdded(ingredient: Ingredient) {
        for (const item of this.shoppingList) {
            if (item.name.toLowerCase() === ingredient.name.toLowerCase()) {
                item.amount += ingredient.amount;
                return;
            }
        }

        this.shoppingList.push(ingredient);
    }

    handleIngredientRemoved(ingredient: Ingredient) {
        for (const item of this.shoppingList) {
            if (item.name.toLowerCase() === ingredient.name.toLowerCase()) {
                if (ingredient.amount >= item.amount) {
                    break;
                }

                item.amount -= ingredient.amount;
                return;
            }
        }
        
        this.shoppingList = this.shoppingList.filter(i => i.name.toLowerCase() !== ingredient.name.toLowerCase());
    }
}
