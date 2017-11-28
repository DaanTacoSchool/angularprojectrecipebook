import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
 /* public recipenumber: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];*/
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]) { }
}

/*   public recipenumber: number,
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]) { }
    */
