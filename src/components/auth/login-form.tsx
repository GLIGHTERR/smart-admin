"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSafeReturnPath } from "@/lib/auth/access";
import { ADMIN_ROLE, AuthError } from "@/lib/auth/types";
import { useAuth } from "@/providers/auth-provider";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const session = await login({ email, password });
      if (!session.user.roles.includes(ADMIN_ROLE)) {
        router.replace("/unauthorized");
        return;
      }

      router.replace(getSafeReturnPath(searchParams.get("returnTo")));
    } catch (caughtError) {
      setError(
        caughtError instanceof AuthError
          ? caughtError.message
          : "Không thể đăng nhập lúc này. Vui lòng thử lại.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
          Email quản trị
        </label>
        <input
          autoComplete="email"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
          id="email"
          name="email"
          placeholder="admin@smart.vn"
          required
          type="email"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-4">
          <label className="text-sm font-semibold text-slate-700" htmlFor="password">
            Mật khẩu
          </label>
          <span className="text-xs text-slate-400">Tối thiểu 8 ký tự</span>
        </div>
        <input
          autoComplete="current-password"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
          id="password"
          minLength={8}
          name="password"
          placeholder="••••••••"
          required
          type="password"
        />
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button
        className="flex w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Đang đăng nhập…" : "Đăng nhập vào hệ thống"}
      </button>
    </form>
  );
}
