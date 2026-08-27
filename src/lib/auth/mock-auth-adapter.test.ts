import { beforeEach, describe, expect, it } from "vitest";
import { getMockRole, MockAuthAdapter } from "@/lib/auth/mock-auth-adapter";

describe("MockAuthAdapter", () => {
  beforeEach(() => localStorage.clear());

  it("creates and restores an admin session for the configured admin email", async () => {
    const adapter = new MockAuthAdapter();
    const session = await adapter.login({
      email: " ADMIN@example.com ",
      password: "password123",
    });

    expect(session.user.roles).toEqual(["admin"]);
    expect(session.user.name).toBe("Admin");
    await expect(adapter.restoreSession()).resolves.toEqual(session);
  });

  it("creates a non-admin session for other valid mock accounts", async () => {
    const adapter = new MockAuthAdapter();
    const session = await adapter.login({
      email: "content.viewer@example.com",
      password: "password123",
    });

    expect(session.user.roles).toEqual(["viewer"]);
    expect(session.user.name).toBe("Content Viewer");
  });

  it("rejects invalid mock credentials", async () => {
    const adapter = new MockAuthAdapter();

    await expect(
      adapter.login({ email: "invalid", password: "short" }),
    ).rejects.toEqual(expect.objectContaining({ code: "INVALID_CREDENTIALS" }));
  });

  it("clears the session on logout", async () => {
    const adapter = new MockAuthAdapter();
    await adapter.login({ email: "admin@example.com", password: "password123" });
    await adapter.logout();

    await expect(adapter.restoreSession()).resolves.toBeNull();
  });
});

describe("getMockRole", () => {
  it("compares admin emails case-insensitively", () => {
    expect(getMockRole(" Owner@Example.com ", "owner@example.com")).toBe("admin");
    expect(getMockRole("member@example.com", "owner@example.com")).toBe("viewer");
  });
});
