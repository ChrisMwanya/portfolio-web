import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation CreateComment($data: GuestbookInput!) {
    createGuestbook(data: $data) {
      data {
        id
        attributes {
          comment
          company
          email
          name
          avatar
          website
          role
        }
      }
    }
  }
`;
