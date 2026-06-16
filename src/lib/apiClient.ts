import { env } from "./env";

type ApiMethod = "GET" | "POST" | "PATCH" | "DELETE";

type ApiClientOptions = {
  method?: ApiMethod;
  body?: unknown;
};

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as { message?: string; error?: string };
    return payload.message ?? payload.error ?? `API request failed with status ${response.status}`;
  } catch {
    return `API request failed with status ${response.status}`;
  }
}

export async function apiClient<T>(path: string, options: ApiClientOptions = {}): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${env.apiBaseUrl}${path}`, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      cache: "no-store"
    });
  } catch {
    throw new Error(`Could not reach Donna API at ${env.apiBaseUrl}. Is the backend running?`);
  }

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
