import { gql } from '@apollo/client';

export const GET_COMMENTS = gql`
  query GetComments {
    guestbooks {
      data {
        id
        attributes {
          comment
          name
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
