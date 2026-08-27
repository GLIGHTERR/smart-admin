import { apiRequest } from "@/lib/api/client";
import {
  AuthError,
  type AuthAdapter,
  type AuthSession,
  type AuthUser,
  type LoginCredentials,
} from "@/lib/auth/types";

interface BackendAuthPayload {
  user: AuthUser;
}

function getLoginPath(): string {
  return process.env.NEXT_PUBLIC_AUTH_LOGIN_PATH ?? "/auth/login";
}

function getSessionPath(): string {
  return process.env.NEXT_PUBLIC_AUTH_SESSION_PATH ?? "/auth/me";
}

function getLogoutPath(): string {
  return process.env.NEXT_PUBLIC_AUTH_LOGOUT_PATH ?? "/auth/logout";
}

function toSession(payload: BackendAuthPayload): AuthSession {
  if (
    !payload?.user ||
    typeof payload.user.id !== "string" ||
    typeof payload.user.email !== "string" ||
    typeof payload.user.name !== "string" ||
    !Array.isArray(payload.user.roles) ||
    !payload.user.roles.every((role) => typeof role === "string")
  ) {
    throw new AuthError(
      "Phản hồi đăng nhập chưa đúng hợp đồng tích hợp.",
      "INVALID_RESPONSE",
    );
  }

  return { user: payload.user };
}

export class ApiAuthAdapter implements AuthAdapter {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const payload = await apiRequest<BackendAuthPayload>(getLoginPath(), {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    return toSession(payload);
  }

  async restoreSession(): Promise<AuthSession | null> {
    const payload = await apiRequest<BackendAuthPayload>(getSessionPath());
    return toSession(payload);
  }

  async logout(): Promise<void> {
    await apiRequest<null>(getLogoutPath(), { method: "POST" });
  }
}
