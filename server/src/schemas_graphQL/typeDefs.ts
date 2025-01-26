const typeDefs = `

  type Query {
    getUser: User
    isRecipeSaved(recipeId: ID!): Boolean
  }

  type Mutation {
    login(userEmail: String!, userPassword: String!): Auth
    signUp(userName: String!, userEmail: String!, userPassword: String!): Auth
    updatePreferences(diet: String, cuisine: String, intolerances: [String]): User
    addRecipe(recipeInput: RecipeInput!): Recipe
    saveRecipe(recipeId: ID!): User
    removeRecipe(recipeId: ID!): User
  }

  type User {
    _id: ID!
    userName: String!
    userEmail: String!
    userPassword: String!
    savedRecipes: [ID]!
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

   input RecipeInput {
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
