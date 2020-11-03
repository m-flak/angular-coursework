import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    submitType: string;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {

    }

    handleFormSubmit(form: NgForm) {
        const ingredient = this.ingredientFromForm(form);

        if (ingredient === null) {
            return;
        }

        switch(this.submitType) {
            case 'add':
                this.shoppingListService.addIngredient(ingredient);
                break;
            case 'delete':
                this.shoppingListService.removeIngredient(ingredient);
                break;
            default:
                break;
        }

        this.submitType = '';
    }

    handleClearForm(form: NgForm) {
        //TODO: Clear edit state as well once edit mode implemented.
        form.reset();
    }

    // bound to submit btn (click)
    setSubmitType(type: string) {
        this.submitType = type;
    }

    private ingredientFromForm(form: NgForm): Ingredient {
        const name: string = form.value['name'] || '';
        const amount: number = Number.parseInt(form.value['amount']);

        if (name.length === 0 || amount === 0 || Number.isNaN(amount)) {
            return null;
        }

        return {
            name: name,
            amount: amount
        };
    }
}
