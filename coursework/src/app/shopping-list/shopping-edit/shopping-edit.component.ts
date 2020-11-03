import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f', { static: false }) editForm: NgForm;
    submitType: string;
    editModeActive: boolean = false;
    editModeItemIndex: number = -1;
    editModeSubscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
        this.editModeSubscription = this.shoppingListService.startedEditing.subscribe((itemIndex: number) => {
            const selectedIngredient = this.shoppingListService.getShoppingListItem(itemIndex);

            if (selectedIngredient === null) {
                return;
            }

            this.editModeActive = true;
            this.editModeItemIndex = itemIndex;

            this.editForm.setValue({
                'name': selectedIngredient.name,
                'amount': selectedIngredient.amount
            });
        });
    }

    ngOnDestroy(): void {
        this.editModeSubscription.unsubscribe();
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
            case 'remove':
                this.shoppingListService.removeIngredient(ingredient);
                break;
            case 'update':
                this.shoppingListService.updateShoppingListItem(
                    this.editModeItemIndex,
                    ingredient
                );
                break;
            case 'delete':
                this.shoppingListService.deleteShoppingListItem(this.editModeItemIndex);
                break;
            default:
                break;
        }

        this.submitType = '';
        this.resetFormAndState(form);
    }

    handleClearForm(form: NgForm) {
        this.resetFormAndState(form);
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

    private resetFormAndState(form: NgForm) {
        form.reset();
        this.editModeActive = false;
        this.editModeItemIndex = -1;
    }

}
