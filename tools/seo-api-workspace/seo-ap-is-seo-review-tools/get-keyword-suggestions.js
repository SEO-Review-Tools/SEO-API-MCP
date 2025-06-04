/**
 * Function to get keyword suggestions from SEO Review Tools API.
 *
 * @param {Object} args - Arguments for the keyword suggestions.
 * @param {string} args.keyword - The keyword to get suggestions for.
 * @param {string} [args.hl="English"] - The language for the suggestions.
 * @param {string} [args.location="United States"] - The location for the suggestions.
 * @returns {Promise<Object>} - The result of the keyword suggestions request.
 */
const executeFunction = async ({ keyword, hl = 'English', location = 'United States' }) => {
  const baseUrl = 'https://api.seoreviewtools.com/v2/keyword-suggestions/';
  const apiKey = process.env.SEO_API_WORKSPACE_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(baseUrl);
    url.searchParams.append('keyword', keyword);
    url.searchParams.append('hl', hl);
    url.searchParams.append('location', location);
    url.searchParams.append('key', apiKey);

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error getting keyword suggestions:', error);
    return { error: 'An error occurred while getting keyword suggestions.' };
  }
};

/**
 * Tool configuration for getting keyword suggestions from SEO Review Tools API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_keyword_suggestions',
      description: 'Get keyword suggestions from SEO Review Tools API.',
      parameters: {
        type: 'object',
        properties: {
          keyword: {
            type: 'string',
            description: 'The keyword to get suggestions for.'
          },
          hl: {
            type: 'string',
            description: 'The language for the suggestions.'
          },
          location: {
            type: 'string',
            description: 'The location for the suggestions.'
          }
        },
        required: ['keyword']
      }
    }
  }
};

export { apiTool };