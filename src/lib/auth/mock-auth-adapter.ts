import {
  clearMockSession,
  readMockSession,
  writeMockSession,
} from "@/lib/auth/storage";
import {
  ADMIN_ROLE,
  AuthError,
  type AuthAdapter,
  type AuthSession,
  type LoginCredentials,
} from "@/lib/auth/types";

const DEFAULT_MOCK_ADMIN_EMAIL = "admin@example.com";

export function getMockRole(
  email: string,
  adminEmail = process.env.NEXT_PUBLIC_MOCK_ADMIN_EMAIL ??
    DEFAULT_MOCK_ADMIN_EMAIL,
): string {
  return email.trim().toLowerCase() === adminEmail.trim().toLowerCase()
    ? ADMIN_ROLE
    : "viewer";
}

function getDisplayName(email: string): string {
  const localPart = email.split("@")[0] ?? "Admin";
  return localPart
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export class MockAuthAdapter implements AuthAdapter {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const email = credentials.email.trim().toLowerCase();

    if (!email.includes("@") || credentials.password.length < 8) {
      throw new AuthError(
        "Email hoặc mật khẩu chưa hợp lệ.",
        "INVALID_CREDENTIALS",
      );
    }

    const role = getMockRole(email);
    const session: AuthSession = {
      user: {
        id: `mock-${role}-${email}`,
        email,
        name: getDisplayName(email) || "Admin",
        roles: [role],
      },
    };

    writeMockSession(session);
    return session;
  }

  async restoreSession(): Promise<AuthSession | null> {
    return readMockSession();
  }

  async logout(): Promise<void> {
    clearMockSession();
  }
}
