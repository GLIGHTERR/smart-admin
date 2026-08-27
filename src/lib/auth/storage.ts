import type { AuthSession } from "@/lib/auth/types";

const MOCK_SESSION_KEY = "smart-admin.mock-session";

function getBrowserStorage(): Storage | null {
  return typeof window === "undefined" ? null : window.localStorage;
}

function isAuthSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== "object" || !("user" in value)) {
    return false;
  }

  const user = value.user;
  return (
    typeof user === "object" &&
    user !== null &&
    "id" in user &&
    typeof user.id === "string" &&
    "email" in user &&
    typeof user.email === "string" &&
    "name" in user &&
    typeof user.name === "string" &&
    "roles" in user &&
    Array.isArray(user.roles) &&
    user.roles.every((role) => typeof role === "string")
  );
}

export function readMockSession(
  storage: Storage | null = getBrowserStorage(),
): AuthSession | null {
  if (!storage) {
    return null;
  }

  const rawSession = storage.getItem(MOCK_SESSION_KEY);
  if (!rawSession) {
    return null;
  }

  try {
    const session: unknown = JSON.parse(rawSession);
    return isAuthSession(session) ? session : null;
  } catch {
    return null;
  }
}

export function writeMockSession(
  session: AuthSession,
  storage: Storage | null = getBrowserStorage(),
): void {
  storage?.setItem(MOCK_SESSION_KEY, JSON.stringify(session));
}

export function clearMockSession(
  storage: Storage | null = getBrowserStorage(),
): void {
  storage?.removeItem(MOCK_SESSION_KEY);
}
