/**
 * Function to get authority scores for a list of URLs.
 *
 * @param {Object} args - Arguments for the authority score request.
 * @param {Array<string>} args.urls - The list of URLs to check authority scores for.
 * @param {string} [args.metrics="pa|da"] - The metrics to retrieve, default is "pa|da".
 * @returns {Promise<Object>} - The result of the authority score request.
 */
const executeFunction = async ({ urls, metrics = 'pa|da' }) => {
  const baseUrl = 'https://api.seoreviewtools.com/bulk-authority-score/';
  const token = process.env.SEO_API_WORKSPACE_API_KEY;

  try {
    // Prepare the request body
    const body = JSON.stringify({ urls });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': token
    };

    // Perform the fetch request
    const response = await fetch(`${baseUrl}?metrics=${metrics}&key=${token}`, {
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
    console.error('Error getting authority scores:', error);
    return { error: 'An error occurred while getting authority scores.' };
  }
};

/**
 * Tool configuration for getting authority scores for URLs.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_authority_scores',
      description: 'Get authority scores for a list of URLs.',
      parameters: {
        type: 'object',
        properties: {
          urls: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The list of URLs to check authority scores for.'
          },
          metrics: {
            type: 'string',
            description: 'The metrics to retrieve, default is "pa|da".'
          }
        },
        required: ['urls']
      }
    }
  }
};

export { apiTool };