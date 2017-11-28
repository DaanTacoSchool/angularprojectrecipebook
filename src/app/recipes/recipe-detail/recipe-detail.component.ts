import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: string;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
        this.recipeService.getRecipe(this.id.toString())
            .then(recipe => this.recipe = recipe)
            .catch(error => console.log('edit init getrecipe error'));
        }
      );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
   // this.router.navigate(['edit'], {relativeTo: this.route});
     this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    console.log('dunneneger'+ this.id);
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
        } );
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
