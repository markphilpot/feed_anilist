import { Handler } from '@netlify/functions';
import {getLogo} from "../logos";

const handler: Handler = async (event, context) => {
  const id = event.queryStringParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Studio id not specified' }),
    };
  }

  const logo = getLogo(id)

  if(logo) {
    return {
      statusCode: 302,
      headers: {
        Location: logo,
      },
    }
  }

  return {
    statusCode: 404
  }
}

export { handler };
