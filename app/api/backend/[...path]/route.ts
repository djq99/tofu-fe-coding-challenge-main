import { NextRequest, NextResponse } from "next/server";
import { APIError } from "utils/errorHandler";

const backendApiHandler = async (req: NextRequest): Promise<NextResponse> => {
  const { method, nextUrl } = req;

  try {
    const token = process.env.USER_TOKEN;

    const baseUrl = process.env.API_SERVER || "https://dev.tofuhq.com";
    const apiPath = `${[baseUrl, ...nextUrl.pathname.split("/").slice(3)].join(
      "/"
    )}/${nextUrl.search}`;

    const headers: HeadersInit = {
      ...req.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let body = null;
    if (method !== "GET") {
      try {
        body = await req.json();
      } catch (error) {
        console.warn("Failed to parse request body:", error);
        throw new APIError(
          "Failed to parse request body",
          400,
          nextUrl.pathname,
          { parseError: error instanceof Error ? error.message : String(error) }
        );
      }
    }

    const response = await fetch(apiPath, {
      method,
      headers,
      body: method === "GET" ? undefined : JSON.stringify(body ?? {}),
    });

    // Handle 204 status separately as empty body responses will end up in the catch block
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
      const errorData = isJson ? await response.json() : await response.text();
      throw new APIError(
        errorData?.error ??
          `An error occurred on ${method} for endpoint ${apiPath}`,
        response.status,
        apiPath,
        errorData
      );
    }

    const data = isJson ? await response.json() : await response.text();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.log(
      `[Backend - Node.js] Server error: ${
        error instanceof APIError ? error.message : "Unknown error"
      } occurred on ${method} for endpoint ${nextUrl.pathname}`
    );

    if (error instanceof APIError) {
      return NextResponse.json(
        { error: error.message, details: error.responseData },
        { status: error.statusCode }
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
};

async function handler(req: NextRequest) {
  if (req.method === "HEAD") {
    return NextResponse.json(null, { status: 200 });
  }
  return backendApiHandler(req);
}

export const maxDuration = 300;

export {
  handler as GET,
  handler as POST,
  handler as PATCH,
  handler as PUT,
  handler as DELETE,
  handler as HEAD,
};
