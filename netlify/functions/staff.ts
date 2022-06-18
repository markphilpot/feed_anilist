import { Handler } from '@netlify/functions';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import RSS from 'rss';
import fetch from 'node-fetch';
import { staffFeedQuery } from '../../src/graphql/feed';
import { staffFeed, staffFeed_Staff_staffMedia_edges, staffFeedVariables } from '../../src/graphql/types/staffFeed';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphql.anilist.co',
    // @ts-ignore Fetch type
    fetch,
  }),
  cache: new InMemoryCache(),
});

const handler: Handler = async (event, context) => {
  const id = event.queryStringParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Staff id not specified' }),
    };
  }

  const response = await client.query<staffFeed, staffFeedVariables>({
    query: staffFeedQuery,
    variables: {
      id: Number(id),
    },
  });

  // TODO check errors
  const { data, errors } = response;

  if (errors) {
    if (errors.map((e) => e.message).some((m) => m === 'Not Found.')) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Staff not found' }),
      };
    }
  }

  const feed = new RSS({
    title: data?.Staff?.name?.userPreferred ?? '',
    feed_url: `https://animefeed.info/.netlify/functions/staff?id=${id}`,
    site_url: data?.Staff?.siteUrl ?? '',
    image_url: data?.Staff?.image?.large ?? '',
  });

  (data?.Staff?.staffMedia?.edges ?? [])
    .filter((e): e is staffFeed_Staff_staffMedia_edges => !!e)
    .forEach((edge: staffFeed_Staff_staffMedia_edges) => {
      const media = edge.node;

      if (!media) {
        return;
      }

      feed.item({
        title: media.title?.userPreferred ?? '',
        description: `<img src="${media.coverImage?.large}" alt="${media.title?.userPreferred ?? ''}"/> ${
          media.description
        }`,
        url: media.siteUrl ?? '',
        date: new Date(media.updatedAt ?? 0),
      });
    });

  const xml = feed.xml();

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/xml',
    },
    body: xml,
  };
};

export { handler };
