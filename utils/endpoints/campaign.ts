import { apiHandler } from "./apiHandler";

export async function fetchCampaign(campaignId: number): Promise<any> {
  return await apiHandler({
    method: "GET",
    url: `/api/backend/campaign/${campaignId}`,
  });
}
