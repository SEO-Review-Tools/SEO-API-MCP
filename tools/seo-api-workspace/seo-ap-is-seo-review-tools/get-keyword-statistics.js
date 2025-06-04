/**
 * Function to get keyword statistics from SEO Review Tools.
 *
 * @param {Object} args - Arguments for the keyword statistics request.
 * @param {Array<string>} args.keywords - The keywords to get statistics for.
 * @param {string} [args.hl="English"] - The language for the response.
 * @param {string} [args.location="United States"] - The location for the keyword statistics.
 * @returns {Promise<Object>} - The result of the keyword statistics request.
 */
const executeFunction = async ({ keywords, hl = 'English', location = 'United States' }) => {
  const baseUrl = 'https://api.seoreviewtools.com/keyword-statistics/';
  const token = process.env.SEO_API_WORKSPACE_API_KEY;

  try {
    // Construct the request body
    const body = JSON.stringify({ keywords });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': token
    };

    // Construct the URL with query parameters
    const url = new URL(baseUrl);
    url.searchParams.append('hl', hl);
    url.searchParams.append('location', location);

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers,
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
    console.error('Error getting keyword statistics:', error);
    return { error: 'An error occurred while getting keyword statistics.' };
  }
};

/**
 * Tool configuration for getting keyword statistics from SEO Review Tools.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_keyword_statistics',
      description: 'Get keyword statistics from SEO Review Tools.',
      parameters: {
        type: 'object',
        properties: {
          keywords: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The keywords to get statistics for.'
          },
          hl: {
            type: 'string',
            description: 'The language for the response.'
          },
          location: {
            type: 'string',
            description: 'The location for the keyword statistics.'
          }
        },
        required: ['keywords']
      }
    }
  }
};

export { apiTool };