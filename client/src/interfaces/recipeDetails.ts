

export default interface RecipeDetails {
  _id?: string;
  author?: string;
  title: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  ingredients: string[];
  instructions: string;
  steps: string[] | null;
  diets?: string[] | null;
  image?: string | null;
  sourceUrl?: string | null;
  spoonacularSourceUrl?: string | null;
  spoonacularId?: number | null;
  reviews?: string[]; 
}
