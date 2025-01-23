const typeDefs = `

  type Query {
    getUser: User
  }

  type Mutation {
    login(userEmail: String!, userPassword: String!): Auth
    addUser(userName: String!, userEmail: String!, userPassword: String!): Auth
  }

  type User {
    _id: ID!
    userName: String!
    userEmail: String!
    userPassword: String!
  }

  type Auth {
    token: String!
    user: User
  }
`;

export default typeDefs;
