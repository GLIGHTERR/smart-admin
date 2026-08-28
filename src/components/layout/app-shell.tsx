"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useAuth } from "@/providers/auth-provider";

const navigation = [
  { href: "/dashboard", label: "Tổng quan", icon: "dashboard" },
  { href: "/moderation/users", label: "Người dùng", icon: "users" },
  { href: "/moderation/content", label: "Nội dung", icon: "content" },
] as const;

function NavIcon({ kind }: { kind: (typeof navigation)[number]["icon"] }) {
  if (kind === "dashboard") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 13h6V4H4v9Zm0 7h6v-4H4v4Zm10 0h6v-9h-6v9Zm0-13h6V4h-6v3Z" />
      </svg>
    );
  }

  if (kind === "users") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20m5.5-8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7.5-1a3 3 0 1 0 0-6m3 15v-1.5a3.5 3.5 0 0 0-2.5-3.35" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm2 4h8M8 12h8m-8 4h5" />
    </svg>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { session, logout } = useAuth();

  async function handleLogout() {
    setIsSigningOut(true);
    try {
      await logout();
      router.replace("/login");
    } finally {
      setIsSigningOut(false);
    }
  }

  const initials = session?.user.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <button
        aria-label="Đóng menu"
        className={`fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm transition lg:hidden ${isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setIsMenuOpen(false)}
        type="button"
      />

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-800 bg-slate-950 text-white transition-transform duration-200 lg:translate-x-0 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-400 font-black text-slate-950">S</span>
          <div>
            <p className="font-bold tracking-tight">Smart Admin</p>
            <p className="text-xs text-slate-400">Control center</p>
          </div>
        </div>

        <nav aria-label="Điều hướng chính" className="flex-1 space-y-1 px-4 py-6">
          <p className="px-3 pb-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500">Quản trị</p>
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? "bg-teal-400 text-slate-950" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
                href={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <NavIcon kind={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex min-w-0 items-center gap-3 rounded-xl bg-white/5 p-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal-400 text-xs font-bold text-slate-950">{initials || "AD"}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{session?.user.name}</p>
              <p className="truncate text-xs text-slate-400">{session?.user.email}</p>
            </div>
          </div>
          <button
            className="w-full rounded-xl border border-white/10 px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white disabled:opacity-60"
            disabled={isSigningOut}
            onClick={handleLogout}
            type="button"
          >
            {isSigningOut ? "Đang đăng xuất…" : "Đăng xuất"}
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label="Mở menu"
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"
              onClick={() => setIsMenuOpen(true)}
              type="button"
            >
              <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Smart Platform</p>
              <p className="hidden text-sm text-slate-500 sm:block">Không gian vận hành dành cho quản trị viên</p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">Hệ thống sẵn sàng</span>
        </header>

        <main className="px-4 py-8 sm:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
