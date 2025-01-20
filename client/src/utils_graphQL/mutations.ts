import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($userEmail: String!, $userPassword: String!) {
    login(userEmail: $userEmail, userPassword: $userPassword) {
      token
      user {
        _id
        userName
        userEmail
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($userName: String!, $userEmail: String!, $userPassword: String!) {
    addUser(userName: $userName, userEmail: $userEmail, userPassword: $userPassword) {
      token
      user {
        _id
        userName
        userEmail
      }
    }
  }
`;



