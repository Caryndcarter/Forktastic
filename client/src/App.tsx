import { Outlet } from "react-router-dom";
import "./index.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

//import Navbar from './components/Navbar';
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

export const editingContext = createContext({
  isEditing: false,
  setIsEditing: (editing: boolean) => {
    console.log(editing);
  },
});

function App() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <editingContext.Provider value={{ isEditing, setIsEditing }}>
      <ApolloProvider client={client}>
        <Outlet />
      </ApolloProvider>
    </editingContext.Provider>
  );
}

export default App;
