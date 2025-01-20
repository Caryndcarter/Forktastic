const typeDefs = `

   # Query Type
  type Query {
     hello: String
  }

  # Mutation Type
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

  # User Type
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  # Auth Type
  type Auth {
    token: String!
    user: User
  }
`;

export default typeDefs;
