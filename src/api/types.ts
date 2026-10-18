// Повторяет контракт backend: SupportRequestDto / SupportResponseDto / ml.enums.ts

export const ResponseType = {
  ANSWER: 1,
  DETAILSREQUEST: 2,
  ORDERINFOREQUEST: 3,
  OPERATOR: 4,
} as const;

export type ResponseType = (typeof ResponseType)[keyof typeof ResponseType];

export interface SupportTechnicalInfo {
  classifier: {
    model: string;
    intent: string;
    category: string;
    confidence: number;
    inference_ms: number;
    request_ms: number;
  } | null;
  generator: {
    model: string;
    knowledge_lookup_ms: number;
    inference_ms: number;
    request_ms: number;
  } | null;
  timings_ms: {
    preprocessing: number;
    preprocessing_request: number;
    classification: number | null;
    knowledge_lookup: number | null;
    generation: number | null;
    total: number;
  };
}

export interface SupportRequest {
  userId: number;
  sessionId: number;
  message: string;
  orderId?: number;
}

export interface SupportResponse {
  text: string;
  type: ResponseType;
  technical?: SupportTechnicalInfo;
}

export interface Order {
  id: number;
  orderComposition: string;
  status: string;
  deliveryDate: string;
}
