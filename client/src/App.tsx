import { Outlet, useLocation} from 'react-router-dom';
import './index.css';
import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
//createHttpLink --commenting out for now in above import
//import Navbar from './components/Navbar';
import RecipeDetails from './interfaces/recipeDetails';
import { createContext, useState } from 'react';
//import { setContext } from '@apollo/client/link/context'; -- commenting out for now

/* Apollo Client setup -- commenting out for now
const httpLink = createHttpLink({
  uri: '/graphql',
});
*/

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


/* Leaving out auth for now: Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
*/

/* Commmenting this out for now: 
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
*/

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