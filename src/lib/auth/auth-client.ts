import { ApiAuthAdapter } from "@/lib/auth/api-auth-adapter";
import { MockAuthAdapter } from "@/lib/auth/mock-auth-adapter";
import type { AuthAdapter } from "@/lib/auth/types";

export type AuthMode = "api" | "mock";

export function getAuthMode(): AuthMode {
  const configuredMode = process.env.NEXT_PUBLIC_AUTH_MODE;
  if (configuredMode === "api" || configuredMode === "mock") {
    return configuredMode;
  }

  return process.env.NODE_ENV === "development" ? "mock" : "api";
}

export function createAuthAdapter(mode = getAuthMode()): AuthAdapter {
  return mode === "mock" ? new MockAuthAdapter() : new ApiAuthAdapter();
}
