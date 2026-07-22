import z from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { makeNWSRequest } from "../helpers/makeNWSRequest.js";
import { AlertsResponse } from "../interfaces/index.js";
import { formatAlert } from "../helpers/formatAlert.js";
import { NWS_API_BASE } from "../consts/index.js";

export const registerGetAlertTool = (server: McpServer): void => {
  server.registerTool(
    "get_alerts",
    {
      description: "Get weather alerts for a state",
      inputSchema: {
        state: z
          .string()
          .length(2)
          .describe("Two-letter state code (e.g. CA, NY)"),
      },
    },
    async ({ state }) => {
      const stateCode = state.toUpperCase();
      const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`;
      const alertsData = await makeNWSRequest<AlertsResponse>(alertsUrl);

      if (!alertsData) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve alerts data",
            },
          ],
        };
      }

      const features = alertsData.features || [];
      if (!features.length) {
        return {
          content: [
            {
              type: "text",
              text: `No active alerts for ${stateCode}`,
            },
          ],
        };
      }

      const formattedAlerts = features.map(formatAlert);
      const alertsText = `Active alerts for ${stateCode}:\n\n${formattedAlerts.join("\n")}`;

      return {
        content: [
          {
            type: "text",
            text: alertsText,
          },
        ],
      };
    },
  )
};