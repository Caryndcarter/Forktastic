const typeDefs = `

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
