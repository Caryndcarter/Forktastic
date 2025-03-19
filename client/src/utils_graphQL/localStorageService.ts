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

const currentRecipeID = "Current Recipe";
const tokenID = "Authentication Token";
const accountDietID = "Dietary Needs";
const queryID = "Query";

// holds logic for managing variables in local storage
class LocalStorageService {
  getCurrentRecipe(): RecipeDetails {
    const stringyRecipe = localStorage.getItem(currentRecipeID);

    if (!stringyRecipe) {
      return defaultRecipe;
    }

    return JSON.parse(stringyRecipe);
  }

  setCurrentRecipe(recipe: RecipeDetails) {
    const stringyRecipe = JSON.stringify(recipe);
    localStorage.setItem(currentRecipeID, stringyRecipe);
  }

  removeCurrentRecipe() {
    localStorage.removeItem(currentRecipeID);
  }

  getIDToken(): string {
    const token = localStorage.getItem(tokenID);

    if (!token) {
      return "";
    }

    return token;
  }

  setIDToken(token: string) {
    localStorage.setItem(tokenID, token);
  }

  removeIDToken() {
    localStorage.removeItem(tokenID);
  }

  getAccountDiet(): DietaryNeeds {
    const stringyDiet = localStorage.getItem(accountDietID);

    if (!stringyDiet) {
      return { diet: "", intolerances: [] };
    }

    return JSON.parse(stringyDiet);
  }

  setAccountDiet(dietaryNeeds: DietaryNeeds): void {
    const stringyDiet = JSON.stringify(dietaryNeeds);
    localStorage.setItem(accountDietID, stringyDiet);
  }

  removeAccountDiet() {
    localStorage.removeItem(accountDietID);
  }

  getQuery(): string {
    const query = localStorage.getItem(queryID);

    if (!query) {
      return "";
    }

    return query;
  }

  setQuery(query: string) {
    localStorage.setItem(queryID, query);
  }

  removeQuery() {
    localStorage.removeItem(queryID);
  }
}

export default new LocalStorageService();
