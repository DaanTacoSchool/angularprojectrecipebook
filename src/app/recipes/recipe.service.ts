import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { environment } from '../../environments/environment';
import { Http, Headers, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {toPromise} from 'rxjs/operator/toPromise';




@Injectable()
export class RecipeService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/recipes'; // URL to web api
  private recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();
/*
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];*/

  constructor(private http: Http, private slService: ShoppingListService) {}

 public getRecipes(): Promise<Recipe[]> {
    console.log('items ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        console.log(response.json() as Recipe);
        this.recipes = response.json() as Recipe[];
        return this.recipes;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getRecipe(index: string): Promise<Recipe> {
    console.log(index + '  indexx + srv url: '+ this.serverUrl);
    return this.http.get(this.serverUrl + '/' + index, { headers: this.headers })
      .toPromise()
      .then(response => {
       /* console.dir(response.json());
        console.log('single recipe');*/
        console.log(response.json() as Recipe);
        return response.json() as Recipe;

      })
      .catch(error => {
        return this.handleError('getrecipe id service');
      });
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {

    const recipe2 = recipe;

    return this.http.post(this.serverUrl , recipe2)
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Recipe;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  updateRecipe(index: string, newRecipe: Recipe) {



    return this.http.put(this.serverUrl + '/' + index , newRecipe)
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Recipe;

      })
      .catch(error => {
        console.log(error);
      });

  }

  deleteRecipe(index: string) {
    console.log('kutneger'+index);
    return this.http.delete(this.serverUrl + '/' + index, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.log('responseneger'+ response.json());
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}


