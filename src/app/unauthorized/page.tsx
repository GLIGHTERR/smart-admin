import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Không có quyền truy cập",
};

export default function UnauthorizedPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-amber-400 text-2xl font-black text-slate-950">!</span>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Truy cập bị từ chối</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">Tài khoản chưa có quyền quản trị</h1>
        <p className="mt-4 text-sm leading-6 text-slate-400">
          Khu vực này chỉ dành cho người dùng có vai trò admin. Hãy đăng nhập bằng tài khoản phù hợp hoặc liên hệ quản trị hệ thống.
        </p>
        <Link className="mt-8 inline-flex rounded-xl bg-teal-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-300" href="/login">
          Quay lại đăng nhập
        </Link>
      </section>
    </main>
  );
}
