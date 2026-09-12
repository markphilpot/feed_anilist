import { Handler } from '@netlify/functions';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import RSS from 'rss';
import fetch from 'node-fetch';
import { studioFeedQuery } from '../../src/graphql/feed';
import { studioFeed, studioFeed_Studio_media_edges, studioFeedVariables } from '../../src/graphql/types/studioFeed';
import { getLogo } from '../logos';
import { mediaGuid, releaseDate } from '../feed';

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
      body: JSON.stringify({ message: 'Studio id not specified' }),
    };
  }

  const response = await client.query<studioFeed, studioFeedVariables>({
    query: studioFeedQuery,
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
        body: JSON.stringify({ message: 'Studio not found' }),
      };
    }
  }

  const feed = new RSS({
    title: data?.Studio?.name ?? '',
    feed_url: `https://animefeed.info/.netlify/functions/studio?id=${id}`,
    site_url: data?.Studio?.siteUrl ?? '',
    image_url: getLogo(id) || undefined,
  });

  // A studio can be attached to the same media more than once (animation studio and producer),
  // which yields duplicate edges for one title.
  const seen = new Set<number>();

  (data?.Studio?.media?.edges ?? [])
    .filter((e): e is studioFeed_Studio_media_edges => !!e)
    .forEach((edge: studioFeed_Studio_media_edges) => {
      const media = edge.node;

      if (!media || seen.has(media.id)) {
        return;
      }

      seen.add(media.id);

      feed.item({
        title: media.title?.userPreferred ?? '',
        description: `<img src="${media.coverImage?.large}" alt="${media.title?.userPreferred ?? ''}"/> <br/> ${
          media.description
        }`,
        url: media.siteUrl ?? '',
        guid: mediaGuid(media.id),
        date: releaseDate(media.startDate),
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
