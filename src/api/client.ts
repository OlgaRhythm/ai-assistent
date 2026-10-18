import type { Order, SupportRequest, SupportResponse } from "./types";

// В dev-режиме запросы идут через proxy из vite.config.ts на localhost:5005.
// В проде ожидается, что сборка фронтенда раздаётся тем же backend-сервером
// (см. public/ в index.ts бэкенда), поэтому базовый путь относительный.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export class ApiError extends Error {
  public readonly status?: number;
  public readonly details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function extractErrorMessage(details: unknown, status: number): string {
  if (details && typeof details === "object") {
    if ("error" in details && typeof details.error === "string") {
      return details.error;
    }
    if ("errors" in details && Array.isArray(details.errors)) {
      const messages = details.errors.flatMap((constraints) =>
        constraints && typeof constraints === "object"
          ? Object.values(constraints as Record<string, string>)
          : [],
      );
      if (messages.length > 0) return messages.join("; ");
    }
  }
  return `The server responded with an error (${status}).`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...init,
    });
  } catch (cause) {
    throw new ApiError(
      "Could not reach the server. Please check your connection.",
      undefined,
      cause,
    );
  }

  if (!response.ok) {
    let details: unknown;
    try {
      details = await response.json();
    } catch {
      details = await response.text().catch(() => undefined);
    }
    throw new ApiError(
      extractErrorMessage(details, response.status),
      response.status,
      details,
    );
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export function sendSupportMessage(
  payload: SupportRequest,
): Promise<SupportResponse> {
  return request<SupportResponse>("/support", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchOrders(userId: number): Promise<Order[]> {
  return request<Order[]>(`/orders?userId=${encodeURIComponent(userId)}`);
}
