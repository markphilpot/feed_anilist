import { gql } from '@apollo/client/core';

export const studioFeedQuery = gql`
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

export const staffFeedQuery = gql`
  query staffFeed($id: Int!, $sort: [MediaSort] = [ID_DESC]) {
    Staff(id: $id) {
      id
      name {
        userPreferred
      }
      image {
        large
      }
      siteUrl
      staffMedia(sort: $sort) {
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
