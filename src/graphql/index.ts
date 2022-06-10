import { gql } from '@apollo/client/core';

export const studioQuery = gql`
  query studioFeed($id: Int!, $sort: [MediaSort] = [ID_DESC]) {
    Studio(id: $id) {
      id
      name
      siteUrl
      media(sort: $sort) {
        edges {
          node {
            id
            title {
              userPreferred
            }
            coverImage {
              large
            }
            siteUrl
            description
            updatedAt
          }
        }
      }
    }
  }
`;
