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
  mutation updatePreferences($diet: String, $intolerances: [String]) {
    updatePreferences(diet: $diet, intolerances: $intolerances) {
      diet
    }
  }
`;


export const ADD_RECIPE = gql`
  mutation addRecipe($recipeInput: recipeInput!) {
    addRecipe(recipeInput: $recipeInput) {
      _id
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


export const ADD_REVIEW = gql `
    mutation AddReview($userId: ID!, $recipeId: ID!, $rating: Int!, $comment: String!) {
      addReview(userId: $userId, recipeId: $recipeId, rating: $rating, comment: $comment) {
        _id
        userId
        recipeId
        rating
        comment
        userName
      }
    }
`;
