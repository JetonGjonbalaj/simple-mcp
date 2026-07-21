import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import { server } from "./server/index.js";

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch(err => {
  console.error("Fatal error in main():", err);
  process.exit(1);
});