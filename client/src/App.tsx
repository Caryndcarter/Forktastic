import { Outlet } from "react-router-dom";
import "./index.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

//import Navbar from './components/Navbar';
import RecipeDetails from "./interfaces/recipeDetails";
import { createContext, useState } from "react";
import { setContext } from "@apollo/client/link/context";
import AuthService from "./utils_graphQL/auth.js";

// Apollo Client setup
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = AuthService.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

// create the client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const defaultRecipe: RecipeDetails = {
  _id: undefined,
  title: "",
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

export const currentRecipeContext = createContext({
  currentRecipeDetails: defaultRecipe,
  setCurrentRecipeDetails: (recipe: RecipeDetails) => {
    console.log(recipe);
  },
});

function App() {
  const [currentRecipeDetails, setCurrentRecipeDetails] =
    useState<RecipeDetails>(defaultRecipe);

  return (
    <currentRecipeContext.Provider
      value={{ currentRecipeDetails, setCurrentRecipeDetails }}
    >
      <ApolloProvider client={client}>
        <Outlet />
      </ApolloProvider>
    </currentRecipeContext.Provider>
  );
}

export default App;
