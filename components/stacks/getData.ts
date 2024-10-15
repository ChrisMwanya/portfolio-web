import { gql } from '@apollo/client';

export const GET_TECHNOS = gql`
  query GetTechnos {
    technos {
      data {
        id
        attributes {
          name
          description
          logo
        }
      }
    }
  }
`;
