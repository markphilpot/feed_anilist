/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: studioSearch
// ====================================================

export interface studioSearch_Page_studios {
  __typename: "Studio";
  id: number;
  name: string;
}

export interface studioSearch_Page {
  __typename: "Page";
  studios: (studioSearch_Page_studios | null)[] | null;
}

export interface studioSearch {
  Page: studioSearch_Page | null;
}

export interface studioSearchVariables {
  query?: string | null;
  page?: number | null;
  perPage?: number | null;
}
