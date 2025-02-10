import { RecipeDetails } from "@/interfaces";

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
      return undefined;
    }
    const recipe: RecipeDetails = JSON.parse(stringyRecipe);
    return recipe;
  }
}

export default new LocalStorageService();
