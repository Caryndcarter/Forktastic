const typeDefs = `

  type Query {
    getUser: User
  }

  type Mutation {
    login(userEmail: String!, userPassword: String!): Auth
    signUp(userName: String!, userEmail: String!, userPassword: String!): Auth
    updatePreferences(diet: String, cuisine: String, intolerances: [String]): User
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
`;

export default typeDefs;
