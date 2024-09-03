import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      data {
        id
        attributes {
          title
          description
          link
          technos {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
