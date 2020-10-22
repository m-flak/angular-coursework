import { Component, OnInit } from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
    shoppingList: Array<Ingredient> = [];

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
        this.shoppingList = this.shoppingListService.getShoppingList();

        this.shoppingListService.ingredientsChanged
            .subscribe((newShoppingList: Array<Ingredient>) => {
                this.shoppingList = newShoppingList;
            });
    }
}
