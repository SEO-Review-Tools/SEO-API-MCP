/**
 * Function to get website traffic data from SEO Review Tools.
 *
 * @param {Object} args - Arguments for the traffic request.
 * @param {string} args.url - The URL of the website to get traffic data for.
 * @returns {Promise<Object>} - The result of the website traffic request.
 */
const executeFunction = async ({ url }) => {
  const baseUrl = 'https://api.seoreviewtools.com';
  const apiKey = process.env.SEO_API_WORKSPACE_API_KEY;
  try {
    // Construct the URL with query parameters
    const requestUrl = new URL(`${baseUrl}/website-traffic/`);
    requestUrl.searchParams.append('url', url);
    requestUrl.searchParams.append('key', apiKey);

    // Perform the fetch request
    const response = await fetch(requestUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
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
    console.error('Error getting website traffic data:', error);
    return { error: 'An error occurred while getting website traffic data.' };
  }
};

/**
 * Tool configuration for getting website traffic data from SEO Review Tools.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_website_traffic',
      description: 'Get website traffic data from SEO Review Tools.',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'The URL of the website to get traffic data for.'
          }
        },
        required: ['url']
      }
    }
  }
};

export { apiTool };