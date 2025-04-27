import { APIError } from "../errorHandler";

type ApiMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

interface ApiRequestOptions extends RequestInit {
  method: ApiMethod;
  url: string;
  body?: any;
  headers?: HeadersInit;
}

const isBackendUrl = (url: string) => {
  const backendUrl = ["/api/backend", "/api/web/"];
  return backendUrl.some((backendPath) => url.startsWith(backendPath));
};

export const apiHandler = async <T>({
  method,
  url,
  body,
  headers = {},
}: ApiRequestOptions): Promise<T> => {
  try {
    const requiresAuth = !isBackendUrl(url);
    if (requiresAuth) {
      const token = process.env.USER_TOKEN;
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }

    if (body && method !== "GET") {
      headers = {
        ...headers,
        "Content-Type": "application/json",
      };
    }

    const response = await fetch(url, {
      method,
      headers,
      body: method === "GET" ? undefined : JSON.stringify(body ?? {}),
    });

    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
      const errorData = isJson ? await response.json() : await response.text();
      throw new APIError(
        errorData?.error?.error ??
          errorData?.error ??
          `An error occurred on ${method} for endpoint ${url}`,
        response.status,
        url,
        errorData
      );
    }

    const data = isJson ? await response.json() : await response.text();
    return data;
  } catch (error) {
    console.log("In production these errors are captured by Sentry");
    throw error;
  }
};
