import { Outlet, useLocation} from 'react-router-dom';
import './index.css';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
//import Navbar from './components/Navbar';
import RecipeDetails from './interfaces/recipeDetails';
import { createContext, useState } from 'react';
import { setContext } from '@apollo/client/link/context';

// Apollo Client setup
const httpLink = createHttpLink({
  uri: '/graphql',
});


// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const defaultRecipe: RecipeDetails  = {
  id: 0, 
  title: '',
  summary: '',
  readyInMinutes: 0,
  servings: 0,
  ingredients: [],
  instructions: '',
  steps: [],
  diets: [],
  image: '',
  sourceUrl: '',
  spoonacularSourceUrl: '',
  spoonacularId: 0,
};

export const currentRecipeContext = createContext({
  currentRecipeDetails: defaultRecipe,
  setCurrentRecipeDetails: (recipe: RecipeDetails) => {console.log(recipe)},
});

function App() {
  const [currentRecipeDetails,setCurrentRecipeDetails] = useState<RecipeDetails>(defaultRecipe);

  const location = useLocation();

  // Conditionally wrap ApolloProvider on specific routes
  const shouldWrapWithApollo = ['/user-info'].includes(location.pathname); // Add routes where Apollo should be used

  return (
    <currentRecipeContext.Provider value ={{ currentRecipeDetails, setCurrentRecipeDetails}}>
    <div>
      {shouldWrapWithApollo ? (
          <ApolloProvider client={client}>
            <Outlet />
          </ApolloProvider>
        ) : (
          <Outlet />
        )}
    </div>
    </currentRecipeContext.Provider>
  );
}

export default App;