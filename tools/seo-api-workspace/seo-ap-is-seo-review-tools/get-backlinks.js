/**
 * Function to get backlinks for a specified URL using SEO Review Tools API.
 *
 * @param {Object} args - Arguments for the backlinks request.
 * @param {string} args.url - The URL for which to retrieve backlinks.
 * @param {number} [args.unique_domains=1] - Whether to return unique domains (1 for yes, 0 for no).
 * @returns {Promise<Object>} - The result of the backlinks request.
 */
const executeFunction = async ({ url, unique_domains = 1 }) => {
  const baseUrl = 'https://api.seoreviewtools.com/backlinks/';
  const apiKey = process.env.SEO_API_WORKSPACE_API_KEY;
  try {
    // Construct the URL with query parameters
    const urlWithParams = new URL(baseUrl);
    urlWithParams.searchParams.append('url', url);
    urlWithParams.searchParams.append('unique_domains', unique_domains.toString());
    urlWithParams.searchParams.append('key', apiKey);

    // Perform the fetch request
    const response = await fetch(urlWithParams.toString(), {
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
    console.error('Error getting backlinks:', error);
    return { error: 'An error occurred while getting backlinks.' };
  }
};

/**
 * Tool configuration for getting backlinks using SEO Review Tools API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_backlinks',
      description: 'Get backlinks for a specified URL.',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'The URL for which to retrieve backlinks.'
          },
          unique_domains: {
            type: 'integer',
            description: 'Whether to return unique domains (1 for yes, 0 for no).'
          }
        },
        required: ['url']
      }
    }
  }
};

export { apiTool };