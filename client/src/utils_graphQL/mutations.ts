import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($userName: String!, $userEmail: String!, $userPassword: String!) {
    addUser(userName: $userame, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;


