import { gql } from '@apollo/client/core';

export const studioSearchQuery = gql`
  query studioSearch($query: String, $page: Int = 1, $perPage: Int = 4) {
    Page(page: $page, perPage: $perPage) {
      studios(search: $query) {
        id
        name
      }
    }
  }
`;

export const staffSearchQuery = gql`
  query staffSearch($query: String, $page: Int = 1, $perPage: Int = 4) {
    Page(page: $page, perPage: $perPage) {
      staff(search: $query) {
        id
        name {
          userPreferred
        }
        siteUrl
        image {
          large
        }
        primaryOccupations
        staffMedia(perPage: 3, sort: [POPULARITY_DESC]) {
          edges {
            node {
              id
              title {
                userPreferred
              }
              siteUrl
              coverImage {
                large
              }
            }
          }
        }
      }
    }
  }
`;

export const vaSearchQuery = gql`
  query vaSearch($query: String, $page: Int = 1, $perPage: Int = 4) {
    Page(page: $page, perPage: $perPage) {
      staff(search: $query) {
        id
        name {
          userPreferred
        }
        siteUrl
        image {
          large
        }
        characters(perPage: 3, sort: [ID_DESC]) {
          edges {
            node {
              id
              name {
                userPreferred
              }
              siteUrl
              image {
                large
              }
            }
          }
        }
      }
    }
  }
`;
