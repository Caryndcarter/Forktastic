interface recipe {
  title: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  ingredients: string[];
  instructions: string;
  steps: string[];
  diet?: string[];
  image?: string;
  sourceUrl?: string;
  spoonacularId?: number;
  spoonacularSourceUrl?: string;
  reviews?: string[];
}

export default recipe;