import { gql } from '@apollo/client';

export const GET_FEEDS = gql`
  query GetFeeds {
    feeds {
      data {
        id
        attributes {
          title
          description
        }
      }
    }
  }
`;
