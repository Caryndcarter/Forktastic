import { RecipeDetails } from "@/interfaces";

const defaultRecipe: RecipeDetails = {
  _id: null,
  title: "",
  author: null,
  summary: "",
  readyInMinutes: 0,
  servings: 0,
  ingredients: [],
  instructions: "",
  steps: [],
  diets: [],
  image: "",
  sourceUrl: "",
  spoonacularSourceUrl: "",
  spoonacularId: 0,
};

// holds logic for managing variables in local storage
class LocalStorageService {
  // first variable: the current recipe details
  setCurrentRecipe(recipe: RecipeDetails) {
    const stringyRecipe = JSON.stringify(recipe);
    localStorage.setItem("currentRecipe", stringyRecipe);
  }

  getCurrentRecipe() {
    const stringyRecipe = localStorage.getItem("currentRecipe");
    // current recipe not set...
    if (!stringyRecipe) {
      return defaultRecipe;
    }
    const recipe: RecipeDetails = JSON.parse(stringyRecipe);
    return recipe;
  }

  setQuery(query: string) {
    localStorage.setItem("query", query);
  }

  getQuery() {
    const query = localStorage.getItem("query");
    // current recipe not set...
    if (!query) {
      return "";
    }
    return query;
  }
}

export default new LocalStorageService();
