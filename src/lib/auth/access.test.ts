import { describe, expect, it } from "vitest";
import { getSafeReturnPath, resolveAdminAccess } from "@/lib/auth/access";
import type { AuthSession } from "@/lib/auth/types";

function sessionWithRoles(roles: string[]): AuthSession {
  return {
    user: {
      id: "user-1",
      email: "admin@example.com",
      name: "Admin",
      roles,
    },
  };
}

describe("resolveAdminAccess", () => {
  it("keeps the guard pending while the session is loading", () => {
    expect(resolveAdminAccess("loading", null)).toBe("loading");
  });

  it("allows an authenticated admin", () => {
    expect(resolveAdminAccess("authenticated", sessionWithRoles(["admin"]))).toBe(
      "allow",
    );
  });

  it("blocks an authenticated user without the admin role", () => {
    expect(resolveAdminAccess("authenticated", sessionWithRoles(["viewer"]))).toBe(
      "redirect-unauthorized",
    );
  });

  it("redirects a missing session to login", () => {
    expect(resolveAdminAccess("unauthenticated", null)).toBe("redirect-login");
    expect(resolveAdminAccess("authenticated", null)).toBe("redirect-login");
  });
});

describe("getSafeReturnPath", () => {
  it("keeps internal application paths", () => {
    expect(getSafeReturnPath("/moderation/users?status=pending")).toBe(
      "/moderation/users?status=pending",
    );
  });

  it("rejects external and protocol-relative redirects", () => {
    expect(getSafeReturnPath("https://example.com")).toBe("/dashboard");
    expect(getSafeReturnPath("//example.com")).toBe("/dashboard");
    expect(getSafeReturnPath("/\\example.com")).toBe("/dashboard");
    expect(getSafeReturnPath(null)).toBe("/dashboard");
  });
});
