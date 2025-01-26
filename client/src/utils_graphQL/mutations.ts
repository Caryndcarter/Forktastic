import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($userEmail: String!, $userPassword: String!) {
    login(userEmail: $userEmail, userPassword: $userPassword) {
      token
      user {
        _id
        userName
        userEmail
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation signUp(
    $userName: String!
    $userEmail: String!
    $userPassword: String!
  ) {
    signUp(
      userName: $userName
      userEmail: $userEmail
      userPassword: $userPassword
    ) {
      token
      user {
        _id
        userName
        userEmail
      }
    }
  }
`;

export const UPDATE_ACCOUNT_PREFERENCES = gql`
  mutation updatePreferences(
    $diet: String
    $cuisine: String
    $intolerances: [String]
  ) {
    updatePreferences(
      diet: $diet
      cuisine: $cuisine
      intolerances: $intolerances
    ) {
      diet
    }
  }
`;


export const ADD_RECIPE = gql`
  mutation addRecipe($recipeInput: recipeInput!) {
    addRecipe(recipeInput: $recipeInput) {
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


export const SAVE_RECIPE = gql`
  mutation saveRecipe($recipeId: ID!) {
    saveRecipe(recipeId: $recipeId) {
      _id
      userName
      userEmail
      savedRecipes
    }
  }
`;

export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: ID!) {
    removeRecipe(recipeId: $recipeId) {
      _id
      userName
      userEmail
      savedRecipes
    }
  }
`;