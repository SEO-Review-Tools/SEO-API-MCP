/**
 * Function to get SERP data from SEO Review Tools.
 *
 * @param {Object} args - Arguments for the SERP request.
 * @param {string} args.keyword - The keyword to search for.
 * @param {string} args.hl - The language for the search results.
 * @param {string} args.location - The location for the search results.
 * @returns {Promise<Object>} - The result of the SERP request.
 */
const executeFunction = async ({ keyword, hl, location }) => {
  const baseUrl = 'https://api.seoreviewtools.com';
  const apiKey = process.env.SEO_API_WORKSPACE_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/rankings/`);
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
    console.error('Error getting SERP data:', error);
    return { error: 'An error occurred while getting SERP data.' };
  }
};

/**
 * Tool configuration for getting SERP data from SEO Review Tools.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_serp',
      description: 'Get SERP data from SEO Review Tools.',
      parameters: {
        type: 'object',
        properties: {
          keyword: {
            type: 'string',
            description: 'The keyword to search for.'
          },
          hl: {
            type: 'string',
            description: 'The language for the search results.'
          },
          location: {
            type: 'string',
            description: 'The location for the search results.'
          }
        },
        required: ['keyword', 'hl', 'location']
      }
    }
  }
};

export { apiTool };