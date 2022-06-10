/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MediaSort } from "./globalTypes";

// ====================================================
// GraphQL query operation: studioFeed
// ====================================================

export interface studioFeed_Studio_media_edges_node_title {
  __typename: "MediaTitle";
  userPreferred: string | null;
}

export interface studioFeed_Studio_media_edges_node_coverImage {
  __typename: "MediaCoverImage";
  large: string | null;
}

export interface studioFeed_Studio_media_edges_node {
  __typename: "Media";
  id: number;
  title: studioFeed_Studio_media_edges_node_title | null;
  coverImage: studioFeed_Studio_media_edges_node_coverImage | null;
  siteUrl: string | null;
  description: string | null;
  updatedAt: number | null;
}

export interface studioFeed_Studio_media_edges {
  __typename: "MediaEdge";
  node: studioFeed_Studio_media_edges_node | null;
}

export interface studioFeed_Studio_media {
  __typename: "MediaConnection";
  edges: (studioFeed_Studio_media_edges | null)[] | null;
}

export interface studioFeed_Studio {
  __typename: "Studio";
  id: number;
  name: string;
  siteUrl: string | null;
  media: studioFeed_Studio_media | null;
}

export interface studioFeed {
  Studio: studioFeed_Studio | null;
}

export interface studioFeedVariables {
  id: number;
  sort?: (MediaSort | null)[] | null;
}
