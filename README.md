# SEO Review Tools API - MCP server 

![Alt text for image](https://www.seoreviewtools.com/wp-content/uploads/SEO-Review-Tools-API-MCP-server.png)

The SEO Review Tools MCP server offers a new way to integrate advanced SEO data into your applications and AI agents. By leveraging the Model Context Protocol (MCP), this server acts as a seamless bridge, enabling Large Language Models (LLMs) and other AI tools to interact with the vast SEO Review Tools API endpoints directly through natural language. 

The MCP server provides you with access to:  

  ✅ 3.1T+ Backlinks
  ✅️ 7B+ Keywords
  ✅️ 560M+ Crawled SERPs  

## Included SEO endpoints 
1. [Backlinks API → ](https://www.seoreviewtools.com/backlink-api/)
2. [Keywords API → ](https://www.seoreviewtools.com/keyword-api/)
3. [Website traffic API → ](https://www.seoreviewtools.com/website-traffic-api/)
4. [SERP API → ](https://www.seoreviewtools.com/rank-tracker-api/)
5. [SEO Content optimization API  → ](https://www.seoreviewtools.com/seo-content-analysis-api/)
6. [Domain authority API  → ](https://www.seoreviewtools.com/authority-score-api/)
7. [Plagiarism API → ](https://www.seoreviewtools.com/duplicate-content-api/)

## MCP Clients 

You can connect SEO Review Tools MCP server to any MCP client. 
Here are some examples of MCP clients:  

- [Claude Desktop](https://claude.ai/download) 
- [Visual Studio Code](https://code.visualstudio.com/) 
- [Copilot Studio](https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/introducing-model-context-protocol-mcp-in-copilot-studio-simplified-integration-with-ai-apps-and-agents/)
- [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/mcp/)
- [LibreChat](https://www.librechat.ai/) 


## The MCP server [local / remote]

The MCP server can either run locally or remote, in the examples below we're connecting with API trough a local MCP setup using Node JS. But the code can also be deployed to a remote Node JS server.   
(Additionally the provided code can be converted from JS to other programming languages like Python or TypeScript)    


## Requirements  

Before starting, please ensure you have:

- [Node.js (v18+ required, v20+ recommended)](https://nodejs.org/)
- [SEO Review Tools API key → ](https://www.seoreviewtools.com/api-pricing/) 


## Installation & Setup

**1. Install dependencies**

Run from your project's root directory:

```sh
npm install
```

### Set tool environment variables

In the `.env` file, you'll see environment variable placeholder.

Register for a subscription [SEO Review Tools API key → ](https://www.seoreviewtools.com/api-pricing/) and add your private Key.  

```
SEO_API_WORKSPACE_API_KEY=

``` 

## How to connect the SEO Review Tools MCP server to Claude Desktop? 

Follow these steps to connect the SEO Review Tools MCP server to Claude Desktop.

**Step 1**: Note the full path to node and the `mcpServer.js` from the previous step.

**Step 2**. Open Claude Desktop → **Settings** → **Developers** → **Edit Config** and add a new MCP server:

```json
{
  "mcpServers": {
    "<server_name>": {
      "command": "<absolute/path/to/node>",
      "args": ["<absolute/path/to/mcpServer.js>"]
    }
  }
}
```

Restart Claude Desktop to activate. 


## Connect the MCP Server to Postman


**Step 1**: Download Postman Desktop.

**Step 2**: Set the type of the MCP request to `STDIO` and set the command to `node </absolute/path/to/mcpServer.js>`.

**Step 3**: Connect with the SEO Review Tools APIs using Postman. 

## More information and support

* [SEO Review Tools](xxx)
