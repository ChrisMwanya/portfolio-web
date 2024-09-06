import { gql } from '@apollo/client';

export const GET_COMMENTS = gql`
  query GetComments {
    guestbooks {
      data {
        id
        attributes {
          message
          firstName
          lastName
          avatar
          email
          company
          website
          role
          createdAt
        }
      }
    }
  }
`;
