import { apiHandler } from "./apiHandler";

export async function fetchContent(id: number): Promise<any> {
  return await apiHandler({
    method: "GET",
    url: `/api/backend/content/${id}`,
  });
}

export async function updateContent(id: number, payload: any): Promise<any> {
  return await apiHandler({
    method: "PATCH",
    url: `/api/backend/content/${id}`,
    body: payload,
  });
}

export async function contentGeneration(
  id: number,
  payload: any
): Promise<any> {
  return await apiHandler({
    method: "POST",
    url: `${process.env.API_SERVER}/content/${id}/gen/`,
    body: payload,
  });
}
