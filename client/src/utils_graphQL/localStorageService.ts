import { RecipeDetails, DietaryNeeds } from "@/interfaces";

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
  setCurrentRecipe(recipe: RecipeDetails) {
    const stringyRecipe = JSON.stringify(recipe);
    localStorage.setItem("currentRecipe", stringyRecipe);
  }

  getCurrentRecipe(): RecipeDetails {
    const stringyRecipe = localStorage.getItem("currentRecipe");

    if (!stringyRecipe) {
      return defaultRecipe;
    }

    return JSON.parse(stringyRecipe);
  }

  setAccountDiet(dietaryNeeds: DietaryNeeds): void {
    const stringyDiet = JSON.stringify(dietaryNeeds);
    localStorage.setItem("Dietary Needs", stringyDiet);
  }

  getAccountDiet(): DietaryNeeds {
    const stringyDiet = localStorage.getItem("Dietary Needs");

    if (!stringyDiet) {
      return { diet: "", intolerances: [] };
    }

    return JSON.parse(stringyDiet);
  }

  setQuery(query: string) {
    localStorage.setItem("query", query);
  }

  getQuery() {
    const query = localStorage.getItem("query");

    if (!query) {
      return "";
    }

    return query;
  }
}

export default new LocalStorageService();
