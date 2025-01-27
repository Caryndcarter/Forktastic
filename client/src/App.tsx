import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./index.css"
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

import { Navbar } from "./components/Navbar"
import Home from "./pages/HomePage"
import RecipeBook from "./pages/RecipeBook"
import RecipeSearch from "./pages/SearchPage"
import RecipeMaker from "./pages/RecipeMaker"
import UserInfo from "./pages/UserInfo"
import type RecipeDetails from "./interfaces/recipeDetails"
import { createContext, useState } from "react"

// Apollo Client setup
const httpLink = createHttpLink({
  uri: "/graphql",
})

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

// create the client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const defaultRecipe: RecipeDetails = {
  id: 0,
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
}

export const currentRecipeContext = createContext({
  currentRecipeDetails: defaultRecipe,
  setCurrentRecipeDetails: (recipe: RecipeDetails) => {
    console.log(recipe)
  },
})

function App() {
  const [currentRecipeDetails, setCurrentRecipeDetails] = useState<RecipeDetails>(defaultRecipe)

  return (
    <Router>
      <currentRecipeContext.Provider value={{ currentRecipeDetails, setCurrentRecipeDetails }}>
        <ApolloProvider client={client}>
          <div className="min-h-screen bg-[#fef3d0]">
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipe-book" element={<RecipeBook />} />
                <Route path="/recipe-search" element={<RecipeSearch />} />
                <Route path="/recipe-maker" element={<RecipeMaker />} />
                <Route path="/user-info" element={<UserInfo />} />
              </Routes>
            </main>
          </div>
        </ApolloProvider>
      </currentRecipeContext.Provider>
    </Router>
  )
}

export default App
