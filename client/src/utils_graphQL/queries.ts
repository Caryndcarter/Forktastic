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
    getUser {
      savedRecipes
    }
  }
`;

export const GET_SPECIFIC_RECIPE_ID = gql`
    query getSpecificRecipeId($recipeId: String!) {
      getSpecificRecipeId(recipeId: $recipeId)
    }
`;



