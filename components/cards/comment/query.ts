import { gql } from '@apollo/client';

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteGuestbook(id: $id) {
      data {
        id
        attributes {
          comment
          company
          createdAt
          email
          name
          role
          website
        }
      }
    }
  }
`;
