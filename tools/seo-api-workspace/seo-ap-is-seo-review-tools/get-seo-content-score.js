/**
 * Function to get the SEO content score from SEO Review Tools.
 *
 * @param {Object} args - Arguments for the SEO content score request.
 * @param {string} args.title_tag - The title tag of the content.
 * @param {string} args.meta_description - The meta description of the content.
 * @param {string} args.body_content - The body content of the document, including HTML formatting.
 * @param {string} args.keyword - The main keyword for the SEO analysis.
 * @param {Array<string>} args.relatedkeywords - Related keywords for the SEO analysis.
 * @returns {Promise<Object>} - The result of the SEO content score request.
 */
const executeFunction = async ({ title_tag, meta_description, body_content, keyword, relatedkeywords }) => {
  const baseUrl = 'https://api.seoreviewtools.com/v5/seo-content-optimization/';
  const token = process.env.SEO_API_WORKSPACE_API_KEY;
  const content_input = {
    title_tag,
    meta_description,
    body_content
  };

  try {
    // Construct the URL with query parameters
    const url = new URL(baseUrl);
    url.searchParams.append('content', '1');
    url.searchParams.append('keyword', keyword);
    url.searchParams.append('relatedkeywords', relatedkeywords.join('|'));
    url.searchParams.append('key', token);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify({ content_input })
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
    console.error('Error getting SEO content score:', error);
    return { error: 'An error occurred while getting the SEO content score.' };
  }
};

/**
 * Tool configuration for getting the SEO content score from SEO Review Tools.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_seo_content_score',
      description: 'Get the SEO content score from SEO Review Tools.',
      parameters: {
        type: 'object',
        properties: {
          title_tag: {
            type: 'string',
            description: 'The title tag of the content.'
          },
          meta_description: {
            type: 'string',
            description: 'The meta description of the content.'
          },
          body_content: {
            type: 'string',
            description: 'The body content of the document, including HTML formatting.'
          },
          keyword: {
            type: 'string',
            description: 'The main keyword for the SEO analysis.'
          },
          relatedkeywords: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Related keywords for the SEO analysis.'
          }
        },
        required: ['title_tag', 'meta_description', 'body_content', 'keyword', 'relatedkeywords']
      }
    }
  }
};

export { apiTool };