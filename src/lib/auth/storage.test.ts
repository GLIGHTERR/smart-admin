import { beforeEach, describe, expect, it } from "vitest";
import {
  clearMockSession,
  readMockSession,
  writeMockSession,
} from "@/lib/auth/storage";
import type { AuthSession } from "@/lib/auth/types";

const adminSession: AuthSession = {
  user: {
    id: "admin-1",
    email: "admin@example.com",
    name: "Admin",
    roles: ["admin"],
  },
};

describe("mock session storage", () => {
  beforeEach(() => localStorage.clear());

  it("persists, restores and clears a valid session", () => {
    writeMockSession(adminSession);
    expect(readMockSession()).toEqual(adminSession);

    clearMockSession();
    expect(readMockSession()).toBeNull();
  });

  it("ignores malformed and invalid stored values", () => {
    localStorage.setItem("smart-admin.mock-session", "not-json");
    expect(readMockSession()).toBeNull();

    localStorage.setItem(
      "smart-admin.mock-session",
      JSON.stringify({ user: { id: "missing-fields" } }),
    );
    expect(readMockSession()).toBeNull();
  });

  it("is safe when browser storage is unavailable", () => {
    writeMockSession(adminSession, null);
    expect(readMockSession(null)).toBeNull();
    expect(() => clearMockSession(null)).not.toThrow();
  });
});
