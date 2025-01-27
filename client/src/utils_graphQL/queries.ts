import { gql } from "@apollo/client";

export const GET_ACCOUNT_PREFERENCES = gql`
  query getAccountPreferences {
    getUser {
      diet
      intolerances
    }
  }
`;

export const GET_SAVED_RECIPES = gql`
  query getSavedRecipes {
    getRecipes {
      _id
      title
      image
      spoonacularId
    }
  }
`;

export const GET_RECIPE = gql`
  query getRecipe($mongoID: ID, $spoonacularId: Int) {
    getRecipe(mongoID: $mongoID, spoonacularId: $spoonacularId) {
      title
      summary
      readyInMinutes
      servings
      ingredients
      instructions
      steps
      diet
      image
      sourceUrl
      spoonacularId
      spoonacularSourceUrl
    }
  }
`;

export const GET_SPECIFIC_RECIPE_ID = gql`
    query getSpecificRecipeId($recipeId: String!) {
      getSpecificRecipeId(recipeId: $recipeId)
    }
`;



