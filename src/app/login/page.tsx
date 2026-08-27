import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

function LoginFormFallback() {
  return <div className="mt-8 h-72 animate-pulse rounded-2xl bg-slate-100" />;
}

export default function LoginPage() {
  return (
    <main className="relative grid min-h-screen overflow-hidden bg-slate-950 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden border-r border-white/10 p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -left-24 top-28 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative flex items-center gap-3 text-white">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-400 text-lg font-black text-slate-950">S</span>
          <div>
            <p className="font-bold tracking-tight">Smart Admin</p>
            <p className="text-xs text-slate-400">Smart Platform Operations</p>
          </div>
        </div>

        <div className="relative max-w-xl pb-12">
          <span className="mb-5 inline-flex rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1.5 text-xs font-semibold text-teal-300">Vận hành tập trung</span>
          <h1 className="text-5xl font-bold leading-[1.08] tracking-[-0.04em] text-white">
            Một góc nhìn rõ ràng cho toàn bộ hệ thống.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
            Theo dõi hoạt động, kiểm duyệt người dùng và nội dung từ một không gian quản trị thống nhất.
          </p>
        </div>

        <p className="relative text-xs text-slate-500">Chỉ dành cho tài khoản có vai trò quản trị viên.</p>
      </section>

      <section className="relative flex items-center justify-center bg-slate-50 px-5 py-12 sm:px-10">
        <div className="absolute left-6 top-6 flex items-center gap-2 text-slate-950 lg:hidden">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-400 font-black text-slate-950">S</span>
          <span className="font-bold">Smart Admin</span>
        </div>

        <div className="w-full max-w-md rounded-3xl border border-white bg-white p-7 shadow-2xl shadow-slate-950/10 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Chào mừng trở lại</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Đăng nhập quản trị</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">Sử dụng tài khoản quản trị được cấp để tiếp tục.</p>
          <Suspense fallback={<LoginFormFallback />}>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
