import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
    @ViewChild('nameInput') refNameInput: ElementRef;
    @ViewChild('amountInput') refAmountInput: ElementRef;
    @Output() ingredientAdded: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
    @Output() ingredientRemoved: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

    constructor() { }

    ngOnInit(): void {
    }

    handleAddItem() {
        const ingredient = this.ingredientFromForm();

        if (ingredient !== null) {
            this.ingredientAdded.emit(ingredient);
        }
    }

    handleDeleteItem() {
        const ingredient = this.ingredientFromForm();

        if (ingredient !== null) {
            this.ingredientRemoved.emit(ingredient);
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
