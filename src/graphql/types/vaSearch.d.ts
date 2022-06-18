/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: vaSearch
// ====================================================

export interface vaSearch_Page_staff_name {
  __typename: "StaffName";
  userPreferred: string | null;
}

export interface vaSearch_Page_staff_image {
  __typename: "StaffImage";
  large: string | null;
}

export interface vaSearch_Page_staff_characters_edges_node_name {
  __typename: "CharacterName";
  userPreferred: string | null;
}

export interface vaSearch_Page_staff_characters_edges_node_image {
  __typename: "CharacterImage";
  large: string | null;
}

export interface vaSearch_Page_staff_characters_edges_node {
  __typename: "Character";
  id: number;
  name: vaSearch_Page_staff_characters_edges_node_name | null;
  siteUrl: string | null;
  image: vaSearch_Page_staff_characters_edges_node_image | null;
}

export interface vaSearch_Page_staff_characters_edges {
  __typename: "CharacterEdge";
  node: vaSearch_Page_staff_characters_edges_node | null;
}

export interface vaSearch_Page_staff_characters {
  __typename: "CharacterConnection";
  edges: (vaSearch_Page_staff_characters_edges | null)[] | null;
}

export interface vaSearch_Page_staff {
  __typename: "Staff";
  id: number;
  name: vaSearch_Page_staff_name | null;
  siteUrl: string | null;
  image: vaSearch_Page_staff_image | null;
  characters: vaSearch_Page_staff_characters | null;
}

export interface vaSearch_Page {
  __typename: "Page";
  staff: (vaSearch_Page_staff | null)[] | null;
}

export interface vaSearch {
  Page: vaSearch_Page | null;
}

export interface vaSearchVariables {
  query?: string | null;
  page?: number | null;
  perPage?: number | null;
}
