"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { resolveAdminAccess } from "@/lib/auth/access";
import { useAuth } from "@/providers/auth-provider";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { status, session } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const decision = resolveAdminAccess(status, session);

  useEffect(() => {
    if (decision === "redirect-login") {
      router.replace(`/login?returnTo=${encodeURIComponent(pathname)}`);
    }

    if (decision === "redirect-unauthorized") {
      router.replace("/unauthorized");
    }
  }, [decision, pathname, router]);

  if (decision !== "allow") {
    return (
      <div
        className="grid min-h-screen place-items-center bg-slate-50"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-teal-500" />
          Đang kiểm tra quyền truy cập…
        </div>
      </div>
    );
  }

  return children;
}
