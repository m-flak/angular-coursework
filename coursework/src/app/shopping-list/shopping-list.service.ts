import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
    // TODO: Remove mock data
    private shoppingList: Array<Ingredient> = [
        {
            name: 'Apples',
            amount: 5
        },
        {
            name: 'Oranges',
            amount: 5
        }
    ];

    ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
    startedEditing: Subject<number> = new Subject<number>();

    constructor() {}

    getShoppingList(): Array<Ingredient> {
        return this.getIngredients();
    }

    getShoppingListItem(index: number): Ingredient {
        const item: Ingredient = this.shoppingList[index];

        if (item === undefined) {
            return null;
        }

        return { ...item };
    }

    updateShoppingListItem(index: number, contents: Ingredient) {
        if (this.shoppingList[index] !== undefined) {
            this.shoppingList[index].name = contents.name;
            this.shoppingList[index].amount = contents.amount;

            this.ingredientsChanged.next(this.getIngredients());
        }
    }

    deleteShoppingListItem(index: number) {
        if (this.shoppingList[index] !== undefined) {
            this.shoppingList.splice(index, 1);

            this.ingredientsChanged.next(this.getIngredients());
        }
    }

    addIngredient(ingredient: Ingredient) {
        return this._addIngredient(ingredient, true);
    }

    addIngredients(ingredients: Array<Ingredient>) {
        ingredients.forEach(i => this._addIngredient(i, false));
        this.ingredientsChanged.next(this.getIngredients());
    }

    removeIngredient(ingredient: Ingredient) {
        return this._removeIngredient(ingredient, true);
    }

    private _addIngredient(ingredient: Ingredient, emit: boolean) {
        for (const item of this.shoppingList) {
            if (item.name.toLowerCase() === ingredient.name.toLowerCase()) {
                item.amount += ingredient.amount;
                return;
            }
        }

        this.shoppingList.push(ingredient);

        if (emit) {
            this.ingredientsChanged.next(this.getIngredients());
        }
    }

    private _removeIngredient(ingredient: Ingredient, emit: boolean) {
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

        if (emit) {
            this.ingredientsChanged.next(this.getIngredients());
        }
    }

    private getIngredients(): Array<Ingredient> {
        return Array.from(this.shoppingList);
    }
}
