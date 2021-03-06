import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    id: number;
    editMode: boolean = false;
    recipeForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private recipeService: RecipeService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
            this.editMode = (params['id'] != null); // undefined == null; undefined doesn't === null
            this.initForm();
        });
    }

    handleSubmit() {
        const componentsRecipe: Recipe = {
            name: this.recipeForm.value['name'],
            description: this.recipeForm.value['description'],
            imageUrl: this.recipeForm.value['imagePath'],
            ingredients: this.recipeForm.value['ingredients']
        };

        if (this.editMode) {
            this.recipeService.updateRecipe(this.id, componentsRecipe);
            this.navigateAway();
            return;
        }

        this.recipeService.addRecipe(componentsRecipe);
        this.navigateAway();
    }

    handleCancel() {
        this.navigateAway();
    }

    handleAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [
                    Validators.required,
                    Validators.pattern(/\d+/)
                ])
            })
        );
    }

    handleDeleteIngredient(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    handleClearIngredients() {
        (<FormArray>this.recipeForm.get('ingredients')).clear();
    }

    get controls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    private initForm() {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);
            recipeName = recipe.name;
            recipeImagePath = recipe.imageUrl;
            recipeDescription = recipe.description;

            if (recipe.ingredients !== undefined && recipe.ingredients.length > 0) {
                for (const ingredient of recipe.ingredients) {
                    recipeIngredients.push(
                        new FormGroup({
                            'name': new FormControl(ingredient.name, Validators.required),
                            'amount': new FormControl(ingredient.amount, [
                                Validators.required,
                                Validators.pattern(/\d+/)
                            ])
                        })
                    );
                }
            }
        }

        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients': recipeIngredients
        });
    }

    private navigateAway() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }
}
