import { gql } from "@apollo/client";

export const GET_ACCOUNT_PREFERENCES = gql`
  query getAccountPreferences {
    getUser {
      diet
      cuisine
      intolerances
    }
  }
`;

export const GET_SAVED_RECIPES = gql`
  query getSavedRecipes {
    getUser {
      savedRecipes
    }
  }
`;

export const IS_RECIPE_SAVED = gql`
  query isRecipeSaved($recipeId: String!) {
    isRecipeSaved(recipeId: $recipeId)
  }
`;

