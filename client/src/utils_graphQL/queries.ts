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

export const IS_RECIPE_SAVED = gql`
  query isRecipeSaved($recipeId: String!) {
    isRecipeSaved(recipeId: $recipeId)
  }
`;
