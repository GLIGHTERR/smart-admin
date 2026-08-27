import { ADMIN_ROLE, type AuthSession, type AuthStatus } from "@/lib/auth/types";

export type AdminAccessDecision =
  | "loading"
  | "allow"
  | "redirect-login"
  | "redirect-unauthorized";

export function resolveAdminAccess(
  status: AuthStatus,
  session: AuthSession | null,
): AdminAccessDecision {
  if (status === "loading") {
    return "loading";
  }

  if (status === "unauthenticated" || !session) {
    return "redirect-login";
  }

  return session.user.roles.includes(ADMIN_ROLE)
    ? "allow"
    : "redirect-unauthorized";
}

export function getSafeReturnPath(value: string | null): string {
  if (!value || !value.startsWith("/")) {
    return "/dashboard";
  }

  try {
    const applicationOrigin = "https://smart-admin.local";
    const resolvedUrl = new URL(value, applicationOrigin);
    if (resolvedUrl.origin !== applicationOrigin) {
      return "/dashboard";
    }

    return `${resolvedUrl.pathname}${resolvedUrl.search}${resolvedUrl.hash}`;
  } catch {
    return "/dashboard";
  }
}
