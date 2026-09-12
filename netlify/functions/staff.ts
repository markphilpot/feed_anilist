import { Handler } from '@netlify/functions';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import RSS from 'rss';
import fetch from 'node-fetch';
import { staffFeedQuery } from '../../src/graphql/feed';
import {
  staffFeed,
  staffFeed_Staff_staffMedia_edges,
  staffFeed_Staff_staffMedia_edges_node,
  staffFeedVariables,
} from '../../src/graphql/types/staffFeed';
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

  // Staff are credited per role, so one title can arrive as several edges (Director, Storyboard,
  // ...). Collapse them into a single item that lists every role.
  const byMedia = new Map<number, { media: staffFeed_Staff_staffMedia_edges_node; roles: string[] }>();

  (data?.Staff?.staffMedia?.edges ?? [])
    .filter((e): e is staffFeed_Staff_staffMedia_edges => !!e)
    .forEach((edge: staffFeed_Staff_staffMedia_edges) => {
      const media = edge.node;

      if (!media) {
        return;
      }

      const entry = byMedia.get(media.id) ?? { media, roles: [] };
      const role = edge.staffRole?.trim();

      if (role && !entry.roles.includes(role)) {
        entry.roles.push(role);
      }

      byMedia.set(media.id, entry);
    });

  byMedia.forEach(({ media, roles }) => {
    const title = media.title?.userPreferred ?? '';
    const credit = roles.length > 0 ? `Role: ${roles.join(', ')} <br/> ` : '';

    feed.item({
      title,
      description: `<img src="${media.coverImage?.large}" alt="${title}"/> <br/> ${credit}${media.description}`,
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
