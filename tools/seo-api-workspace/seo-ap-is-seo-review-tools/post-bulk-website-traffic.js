/**
 * Function to post bulk website traffic data to SEO Review Tools API.
 *
 * @param {Object} args - Arguments for the bulk website traffic request.
 * @param {Array<string>} args.domains - An array of domain names to check traffic for.
 * @param {string} [args.location="United States"] - The location for the traffic data.
 * @param {string} [args.hl="English"] - The language for the traffic data.
 * @returns {Promise<Object>} - The result of the bulk website traffic request.
 */
const executeFunction = async ({ domains, location = 'United States', hl = 'English' }) => {
  const baseUrl = 'https://api.seoreviewtools.com/v2/bulk-website-traffic/';
  const token = process.env.SEO_API_WORKSPACE_API_KEY;
  try {
    // Prepare the request body
    const body = JSON.stringify({ domains });

    // Set up the URL with query parameters
    const url = new URL(baseUrl);
    url.searchParams.append('key', token);
    url.searchParams.append('location', location);
    url.searchParams.append('hl', hl);

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': token
      },
      body
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting bulk website traffic data:', error);
    return { error: 'An error occurred while posting bulk website traffic data.' };
  }
};

/**
 * Tool configuration for posting bulk website traffic data to SEO Review Tools API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'post_bulk_website_traffic',
      description: 'Post bulk website traffic data to SEO Review Tools API.',
      parameters: {
        type: 'object',
        properties: {
          domains: {
            type: 'array',
            items: {
              type: 'string',
              description: 'An array of domain names to check traffic for.'
            },
            description: 'An array of domain names to check traffic for.'
          },
          location: {
            type: 'string',
            description: 'The location for the traffic data.'
          },
          hl: {
            type: 'string',
            description: 'The language for the traffic data.'
          }
        },
        required: ['domains']
      }
    }
  }
};

export { apiTool };