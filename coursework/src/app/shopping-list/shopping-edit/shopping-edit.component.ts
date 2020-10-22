import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
    @ViewChild('nameInput') refNameInput: ElementRef;
    @ViewChild('amountInput') refAmountInput: ElementRef;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
    }

    handleAddItem() {
        const ingredient = this.ingredientFromForm();

        if (ingredient !== null) {
            this.shoppingListService.addIngredient(ingredient);
        }
    }

    handleDeleteItem() {
        const ingredient = this.ingredientFromForm();

        if (ingredient !== null) {
            this.shoppingListService.removeIngredient(ingredient);
        }
    }

    private ingredientFromForm(): Ingredient {
        const name: string = this.refNameInput.nativeElement.value;
        const amount: number = Number.parseInt(this.refAmountInput.nativeElement.value);

        if (name.length === 0 || amount === 0 || Number.isNaN(amount)) {
            return null;
        }

        return {
            name: name,
            amount: amount
        };
    }
}
