import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: string;
  editMode = false;
  recipeForm: FormGroup;
  public recipe: Recipe;
  // recipes: Recipe[];

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
    this.initForm();

  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        });
    console.log(this.recipeService.getRecipe(this.id.toString())
      .then(recipe => this.recipe = recipe)
      .catch(error => console.log('editmode error')) );

  }

  onSubmit() {
    console.log('edit1: '+this.id);
    const newRecipe = new Recipe(
      this.id,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    if (this.editMode) {
      console.log('edit: '+this.id);
      console.log('edit6'+  this.recipeForm);
      this.recipeService.updateRecipe(this.id,newRecipe);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recipe2: Recipe;
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
    console.log('edit3 id: '+ this.id);



      this.recipeService.getRecipe(this.id.toString())
        .then(recipe => recipe2 = recipe)
        .catch(error => console.log('editmode error'));

      console.log('edit4 recipe2: '+ recipe2);
      console.log('edit2 recipe: '+ this.recipe);
      //console.log('edit5 array'+ this.recipes);
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
      if (this.recipe['ingredients']) {
        for (const ingredient of this.recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });
    console.log('edit7 '+ this.recipeForm);
  }

}
