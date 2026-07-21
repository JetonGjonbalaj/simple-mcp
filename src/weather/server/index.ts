import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGetAlertTool } from "../tools/getAlerts.js";
import { registerGetForecastTool } from "../tools/getForecast.js";

export const server = new McpServer({
  name: "weather",
  version: "1.0.0"
});

registerGetAlertTool(server);
registerGetForecastTool(server);
