const typeDefs = `

  type Query {
    getUser: User
    getSpecificRecipeId(recipeId: String!): String
    isRecipeSaved(recipeId: String!): Boolean
    getRecipes: [Recipe]
    getRecipe(mongoID: ID, spoonacularId:Int): Recipe
  }

  type Mutation {
    login(userEmail: String!, userPassword: String!): Auth
    signUp(userName: String!, userEmail: String!, userPassword: String!): Auth
    updatePreferences(diet: String, intolerances: [String]): User
    addRecipe(recipeInput: recipeInput!): Recipe
    saveRecipe(recipeId: ID!): User
    removeRecipe(recipeId: ID!): User
  }

  type User {
    _id: ID!
    userName: String!
    userEmail: String!
    userPassword: String!
    savedRecipes: [ID!]!
    diet: String
    intolerances: [String]
  }

  type Auth {
    token: String!
    user: User
  }

   type Recipe {
    _id: ID!
    title: String!
    summary: String!
    readyInMinutes: Int!
    servings: Int!
    ingredients: [String!]!
    instructions: String!
    steps: [String!]!
    diet: [String]
    image: String
    sourceUrl: String
    spoonacularId: Int
    spoonacularSourceUrl: String
  }

   input recipeInput {
    title: String!
    summary: String!
    readyInMinutes: Int!
    servings: Int!
    ingredients: [String!]!
    instructions: String!
    steps: [String!]!
    diet: [String]
    image: String
    sourceUrl: String
    spoonacularId: Int
    spoonacularSourceUrl: String
  }
`;

export default typeDefs;
