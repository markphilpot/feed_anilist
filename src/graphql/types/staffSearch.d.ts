/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: staffSearch
// ====================================================

export interface staffSearch_Page_staff_name {
  __typename: "StaffName";
  userPreferred: string | null;
}

export interface staffSearch_Page_staff_image {
  __typename: "StaffImage";
  large: string | null;
}

export interface staffSearch_Page_staff_staffMedia_edges_node_title {
  __typename: "MediaTitle";
  userPreferred: string | null;
}

export interface staffSearch_Page_staff_staffMedia_edges_node_coverImage {
  __typename: "MediaCoverImage";
  large: string | null;
}

export interface staffSearch_Page_staff_staffMedia_edges_node {
  __typename: "Media";
  id: number;
  title: staffSearch_Page_staff_staffMedia_edges_node_title | null;
  siteUrl: string | null;
  coverImage: staffSearch_Page_staff_staffMedia_edges_node_coverImage | null;
}

export interface staffSearch_Page_staff_staffMedia_edges {
  __typename: "MediaEdge";
  node: staffSearch_Page_staff_staffMedia_edges_node | null;
}

export interface staffSearch_Page_staff_staffMedia {
  __typename: "MediaConnection";
  edges: (staffSearch_Page_staff_staffMedia_edges | null)[] | null;
}

export interface staffSearch_Page_staff {
  __typename: "Staff";
  id: number;
  name: staffSearch_Page_staff_name | null;
  siteUrl: string | null;
  image: staffSearch_Page_staff_image | null;
  primaryOccupations: (string | null)[] | null;
  staffMedia: staffSearch_Page_staff_staffMedia | null;
}

export interface staffSearch_Page {
  __typename: "Page";
  staff: (staffSearch_Page_staff | null)[] | null;
}

export interface staffSearch {
  Page: staffSearch_Page | null;
}

export interface staffSearchVariables {
  query?: string | null;
  page?: number | null;
  perPage?: number | null;
}
