/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MediaSort } from "./globalTypes";

// ====================================================
// GraphQL query operation: staffFeed
// ====================================================

export interface staffFeed_Staff_name {
  __typename: "StaffName";
  userPreferred: string | null;
}

export interface staffFeed_Staff_image {
  __typename: "StaffImage";
  large: string | null;
}

export interface staffFeed_Staff_staffMedia_edges_node_title {
  __typename: "MediaTitle";
  userPreferred: string | null;
}

export interface staffFeed_Staff_staffMedia_edges_node_coverImage {
  __typename: "MediaCoverImage";
  large: string | null;
}

export interface staffFeed_Staff_staffMedia_edges_node {
  __typename: "Media";
  id: number;
  title: staffFeed_Staff_staffMedia_edges_node_title | null;
  coverImage: staffFeed_Staff_staffMedia_edges_node_coverImage | null;
  siteUrl: string | null;
  description: string | null;
  updatedAt: number | null;
}

export interface staffFeed_Staff_staffMedia_edges {
  __typename: "MediaEdge";
  node: staffFeed_Staff_staffMedia_edges_node | null;
  staffRole: string | null;
}

export interface staffFeed_Staff_staffMedia {
  __typename: "MediaConnection";
  edges: (staffFeed_Staff_staffMedia_edges | null)[] | null;
}

export interface staffFeed_Staff {
  __typename: "Staff";
  id: number;
  name: staffFeed_Staff_name | null;
  image: staffFeed_Staff_image | null;
  siteUrl: string | null;
  staffMedia: staffFeed_Staff_staffMedia | null;
}

export interface staffFeed {
  Staff: staffFeed_Staff | null;
}

export interface staffFeedVariables {
  id: number;
  sort?: (MediaSort | null)[] | null;
}
