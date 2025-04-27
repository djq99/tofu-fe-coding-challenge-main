import { apiHandler } from "./apiHandler";

export async function fetchPlaybook(playbookId?: number): Promise<any> {
  const endpoint = playbookId
    ? `${process.env.API_SERVER}/playbook/${playbookId}`
    : `${process.env.API_SERVER}/playbook`;
  return await apiHandler({
    method: "GET",
    url: endpoint,
  });
}
