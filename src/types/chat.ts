import type { SupportTechnicalInfo } from "../api/types";

export type ChatMessage =
  | {
      id: string;
      role: "user";
      text: string;
    }
  | {
      id: string;
      role: "assistant";
      text: string;
      technical?: SupportTechnicalInfo;
      needsOrderId?: boolean;
    }
  | {
      id: string;
      role: "system";
      text: string;
      variant: "error" | "info";
    };
