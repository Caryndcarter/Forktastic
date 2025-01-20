const typeDefs = `

   # Query Type
  type Query {
     hello: String
  }

  # Mutation Type
  type Mutation {
    login(userEmail: String!, userPassword: String!): Auth
    addUser(userName: String!, userEmail: String!, userPassword: String!): Auth
  }

  # User Type
  type User {
    _id: ID!
    userName: String!
    userEmail: String!
    userPassword: String!
  }

  # Auth Type
  type Auth {
    token: String!
    user: User
  }
`;

export default typeDefs;
